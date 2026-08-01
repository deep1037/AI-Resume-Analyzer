# Task: Fix MongoDB Atlas `querySrv ECONNREFUSED` on server startup

## Diagnosis
- Node.js's built-in DNS resolver (c-ares) fails to resolve Atlas SRV record `_mongodb._tcp.cluster0.lrenbfc.mongodb.net` using the router DNS (192.168.1.1), returning `querySrv ECONNREFUSED`.
- Verified: `nslookup` resolves fine; TCP to Atlas shard succeeds; `dns.setServers(['8.8.8.8','8.8.4.4'])` makes Node resolve SRV correctly.

## Plan Steps
- [x] 0. Gather context (read db.ts, server.ts, package.json, .env presence; run nslookup + Node DNS tests)
- [x] 1. Confirm plan with user
- [x] 2. Add `dns.setServers(['8.8.8.8', '8.8.4.4'])` ONCE in `server/src/server.ts` before any MongoDB connection
- [x] 3. Verify server starts and connects to MongoDB Atlas
  - DNS SRV error `querySrv ECONNREFUSED` is **resolved** by the DNS override.
  - New blocker: Atlas rejects connection — public IP `223.184.100.77` not whitelisted in Network Access.
- [x] 4. Fallback: standard (non-SRV) connection string prepared in `server/.env` (backup saved to `server/.env.bak`); verified it reaches Atlas auth/IP stage (no DNS error).

## Final Status
- **Code fix (kept):** `dns.setServers(['8.8.8.8','8.8.4.4'])` in `server/src/server.ts` — resolves the original `querySrv ECONNREFUSED`.
- **Fallback prepared:** `server/.env` now uses a standard (non-SRV) connection string; original SRV string backed up then **deleted** (to prevent GitHub secret leak).
- **Secret leak prevention:** `.gitignore` updated to cover:
  - `server/.env.bak`
  - `*.env.bak`, `.env.*.bak`
  - `server/diag-atlas-conn.out.txt`, `*.out.txt`
- **Verification script:** `server/scripts/verify-mongo-connection.js` — run `node server/scripts/verify-mongo-connection.js` after whitelisting the IP.
- **Deep diagnostic:** `server/scripts/diag-atlas-conn.js` writes `server/diag-atlas-conn.out.txt`. Result:
  - DNS SRV via 8.8.8.8: ✅ resolves all 3 shards
  - Public IP: `223.184.100.77`
  - TCP handshake: ✅ connects, then server closes WITHOUT sending data → classic **Atlas IP whitelist rejection**
  - MongoClient: ❌ `connection <monitor> to 159.41.229.75:27017 closed`
- **User action required (cannot be done from code):** Add `223.184.100.77` (or `0.0.0.0/0`) to MongoDB Atlas → Network Access → IP Access List.

