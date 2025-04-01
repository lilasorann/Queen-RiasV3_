const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "*",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2347050510935",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU9tNUxobTdoSUxmWFBXam42ZkEyNHI1d0g4VGFhWkx1d09SbnBaSWVXRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFhnMTNla21RSG9kZ01xblF6QlZhNFBUZTZ1SE01bnFEOUFtOGs4M3J5az0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTHRRN2w5ZjhLTTBlLzVVc2lVc2FURkZiU2g0V1FGa1hhU016UDdIcFVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1UnA0RUtxZTRXZGN6V205T0NqQmdEMG1zcUx6RVEwRy9xUTc2MVFIdWxZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNJWFdSeWhuTE55eGZ4Q3pBdTVuVXdwK0dxVVpmczdOcnlBS254aHErMDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVHZVhUL2ZqQVUzVzg0QThoNTB3SUwyL25UTVdwcmhhS2ZGUUgvNUV4aE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUk1NjFCL2RjMndPOU5wTzVYV3ltMTNHTWxoTkhTZXpQV0hza1VCWTlsVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRTFMN3Vjb0k5enU0VDhrUmJ5S0NEbVJ1RVMrZjNycFR1OTRIZjJuYlFSND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBuYmNqRFlMNXYvZnIzdWJwcU91aE1Gc2hYNUl6bFp5ZTc3Nys2SVcrMHN3MUJsOGkwamFvSmFuK3N1UjFaZ0ZmM1BPaWI0UTNieWxqMjVMazJpTUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk5LCJhZHZTZWNyZXRLZXkiOiJXMGxQci9hbUtXK0p6UkorRmVCRzBXNUc0OC9DYlU5WkJ5cmJ0YVNHTHpjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI0N0dDQlpYRSIsIm1lIjp7ImlkIjoiMjM0NzA1MDUxMDkzNTo0OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZOl8J2TsvCdk6zwnZO98J2TuPCdk7siLCJsaWQiOiIxNDE2NjEyMDgzNjcxOTE6NDlAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNblN3YklHRUk3YXNMOEdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI5M2VvNG45QkNmbWdsNkJHNTFGenJkcjAzS0RlSVB4M3ZXR2NtVXdMNFdjPSIsImFjY291bnRTaWduYXR1cmUiOiIwWUdKU1hoUVliTVpOaFJMN0I1ZU8yb0ZuSDV4Skx2VFVjalJwbVAzcGJBNjNadzVTVFZqQTFzcHI2eDhRekl6Q2JsR2Y4aXg1NVJnTjRXSHcvY2pDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNHU2MG5QQ2RaYmc5STRWV0VLT0JMcUQwOFFRcXlEb0lkekY4K2MyZVdHUUpIdzZzOFloY3JkQWg4Z1IvRFpaS01heGlia3ZzVW5zdHZ2N1d2blQ3QWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDUwNTEwOTM1OjQ5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZkM3FPSi9RUW41b0plZ1J1ZFJjNjNhOU55ZzNpRDhkNzFobkpsTUMrRm4ifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MzUzMTI5MSwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJEOSJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
