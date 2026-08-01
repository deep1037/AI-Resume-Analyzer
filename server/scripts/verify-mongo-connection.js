/**
 * Verify MongoDB Atlas connectivity.
 *
 * Run:
 * node server/scripts/verify-mongo-connection.js
 */

const dns = require("dns");

// Force Google DNS (fixes SRV lookup issues)
dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});

const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is missing in server/.env");
    process.exit(1);
  }

  const sanitized = uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");

  console.log("Connecting to:");
  console.log(sanitized);
  console.log("");

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  });

  try {
    await client.connect();

    console.log("✅ MongoDB Connected Successfully!");

    const admin = client.db().admin();

    const result = await admin.command({
      ping: 1,
    });

    console.log("Ping Result:");
    console.log(result);

    const databases = await admin.listDatabases();

    console.log("");
    console.log("Available Databases:");

    databases.databases.forEach((db) => {
      console.log(" -", db.name);
    });

    await client.close();

    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection failed.");
    console.error("");
    console.error("Name:");
    console.error(err.name);
    console.error("");
    console.error("Message:");
    console.error(err.message);

    if (err.reason) {
      console.error("");
      console.error("Reason:");
      console.error(err.reason);
    }

    process.exit(1);
  }
}

main();