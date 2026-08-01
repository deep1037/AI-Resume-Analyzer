/**
 * Deep diagnostic for MongoDB Atlas connectivity.
 * Writes results to diag-atlas-conn.out.txt in the server directory.
 *
 * Run: node server/scripts/diag-atlas-conn.js
 */
const net = require('net');
const fs = require('fs');
const path = require('path');
const dns = require('dns');
const https = require('https');
const { promisify } = require('util');

const outPath = path.join(__dirname, '..', 'diag-atlas-conn.out.txt');
const lines = [];
const log = (...args) => {
  const msg = args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ');
  lines.push(msg);
  console.log(msg);
};

const HOST = 'ac-ie3kyrf-shard-00-00.lrenbfc.mongodb.net';
const PORT = 27017;

function getPublicIp() {
  return new Promise((resolve) => {
    https
      .get('https://api.ipify.org', (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(d));
      })
      .on('error', () => resolve('(unavailable)'));
  });
}

function rawTcpProbe() {
  return new Promise((resolve) => {
    const s = net.connect({ port: PORT, host: HOST, timeout: 8000 }, () => {
      log('3. TCP connected successfully to ' + HOST + ':' + PORT);
    });
    let gotData = false;
    s.on('data', (d) => {
      gotData = true;
      log('   Received ' + d.length + ' bytes (hex): ' + d.toString('hex').slice(0, 200));
    });
    s.on('close', () => {
      log(
        '   Connection closed by server' +
          (gotData ? ' after receiving data' : ' WITHOUT any data (typical of IP whitelist rejection)')
      );
      resolve();
    });
    s.on('error', (e) => {
      log('   Socket error:', e.code, e.message);
      resolve();
    });
    s.on('timeout', () => {
      log('   Timeout - server sent nothing (port may be filtered)');
      s.destroy();
      resolve();
    });
    setTimeout(() => {
      log('   10s watchdog fired');
      s.destroy();
      resolve();
    }, 10000);
  });
}

async function mongoClientProbe() {
  try {
    const { MongoClient } = require('mongodb');
    const p = path.join(__dirname, '..', '.env');
    const content = fs.readFileSync(p, 'utf8');
    const line = content.split(/\r?\n/).find((l) => /^MONGODB_URI\s*=/.test(l));
    if (!line) {
      log('4. MONGODB_URI not found in server/.env');
      return;
    }
    const uri = line.replace(/^MONGODB_URI\s*=/, '');
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
    await client.connect();
    log('4. MongoClient connected OK');
    await client.close();
  } catch (e) {
    log('4. MongoClient failed:', e.message.split('\n')[0]);
  }
}

async function main() {
  log('=== Atlas Connectivity Diagnostic ===');
  log('Timestamp:', new Date().toISOString());
  log('Host:', HOST, 'Port:', PORT);

  // 1. DNS SRV resolution
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    const srv = promisify(dns.resolveSrv);
    const r = await srv('_mongodb._tcp.cluster0.lrenbfc.mongodb.net');
    log('1. DNS SRV via 8.8.8.8:', r.map((x) => x.name + ':' + x.port).join(', '));
  } catch (e) {
    log('1. DNS SRV FAILED:', e.code, e.message);
  }

  // 2. Public IP
  log('2. Public IP:', await getPublicIp());

  // 3. Raw TCP handshake
  await rawTcpProbe();

  // 4. MongoClient attempt
  await mongoClientProbe();

  fs.writeFileSync(outPath, lines.join('\n'));
  log('Wrote output to:', outPath);
  process.exit(0);
}

main();

