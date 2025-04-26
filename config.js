const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "!",
    ownerName: process.env.OWNER_NAME || "Victor",
    ownerNumber: process.env.OWNER_NUMBER || "2347050510935",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUxLaVg4WmFlelNGY3lOSTk2R1gwa2xLTks4UWM3OFFwaTc3YzFoYUcwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMklnNXpNbWswODRocWRoM01XTTlOU3F2TWFTbzNBRndZUWhpYlgwU1FETT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTDF3cUdIOUQ4d3JIaTdzdU5jYUpoVXg4dWRubzdoa0xlWGV4c2hQd0ZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXa04yVmEyQUtvWS9GdGZYcGNVS0ExQno1blE0QUprQUNiLzZXN3hZZGs4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlJL0JveVV5amNNS3RhVWdrMUVWM2dtZjgwelI4UFRLcHVNUjA2TFpDRjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRZdWY2UmJjV0hteXlHRk43UUYzczNyRVJvWURocVBSKzNsb0E5V25hVlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUt0TlgvMTErVjJjSERRRmxzVWRQMzVYTDJCVEdGMHlVMlcyL3JjZEUxQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVHJMSngwSWV0N2FmUU9FeG5iblArYWRYVTcrSXNEYVJNVU5nMGxZeDEzQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJ0cllGb1N5USsvOEhiRWRlZlJCQlVZMlFmRWYwbTJMTmFvSTM0WDBubC8wOGtkb2JmTXBqWFViVmVWT2t5K2RlYURrMEZ0SDZ5dFAwZVo4d2N6TEJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE3LCJhZHZTZWNyZXRLZXkiOiJSTnFoZkdmQ0lVODAvYjl5eENYS2x3UHAwZHg1bmhTV3hIR0NVekJIYlRFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJGOTJYUVA3OSIsIm1lIjp7ImlkIjoiMjM0NzA1MDUxMDkzNTo2NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZOl8J2TsvCdk6zwnZO98J2TuPCdk7siLCJsaWQiOiIxNDE2NjEyMDgzNjcxOTE6NjVAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNblN3YklHRUo2SXM4QUdHQlVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI5M2VvNG45QkNmbWdsNkJHNTFGenJkcjAzS0RlSVB4M3ZXR2NtVXdMNFdjPSIsImFjY291bnRTaWduYXR1cmUiOiJZWWxYbmhYSFlzSEJLUzZqWXJMc3FlZkdMODJDeVFMUEpPQjFDVVhIWlFSbnJ6NkQ5Y0VXNFp0ell0bmZJTmlLeUJKSzBJQjlCZnk1NTlLMUNBWHJEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiLzlqR3ptQ0RwemhRdFhOUEFjZzd4L0xteXpZeTg1bDFGdHU3NXYwSk9QcW1ub2NXQ2FyczBMSXhhREVxbm5YWXZod1FRMzV0RkdpNXZ5WjdPYmhPRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDUwNTEwOTM1OjY1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZkM3FPSi9RUW41b0plZ1J1ZFJjNjNhOU55ZzNpRDhkNzFobkpsTUMrRm4ifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTY2NzExNSwibGFzdFByb3BIYXNoIjoibm0zQmIifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
