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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUdLRUhLUEIrRlViNWt2UGJIOGdQcit0Y2RmTm56cTRPU3FDOXpGYk5HVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiemxFbkV3dXNrck9tcFBjQ2NJRDF2UjdoTXcxK2ZtU0RHT3d2TGpCWHdXWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQVpIcUtqTCtLeTRYa1YwR2VyczlOaVdWSHFjajZLMDR0aTIzRnR2ZVY0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkWXBIcjRHWDVLU0pMazhCSlFtTjAxdENTa056RGJPY2tkRGtHSmJzSzFZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitFeXFBM3RsT0Q4em45Z1NZTWdMVmFMdGlEYU1yaWdFZ3ltWGllZUpZbW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1nZDNOSWVYM1BHYWh1dnRnWnRrVlRSeUlGcnpSV0NzMy9KVGxnaEFPQk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkZRbGVETGdWK0hpMGc5QzJTelZsVjJocXl2aGY4c0FCUkFvUWlQSHUyWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGZnSDJrdjFpMHdiYlZ5VWtPMjdSaTE4OVRSWExnRGdoc2E2c1BlSTAyaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imt2a1NKOE9RRWpZRlZHNHQ3cytGQUp1VUIrQnl4Ym9IZ1JPcW1tNnVManh6L09RMU5zYXQ5RzdQc1ZjZll2UXZYLzI0dWx4SnJFWVUyQjZYOWpsZWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6IkFDVVo4Q1NqTCtsNnJhblpzM09WYWJld3kyUjUybzFVOUhtOGdkWUk0NGs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkhHM1FaMkdXIiwibWUiOnsiaWQiOiIyMzQ3MDUwNTEwOTM1OjY0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdk6XwnZOy8J2TrPCdk73wnZO48J2TuyIsImxpZCI6IjE0MTY2MTIwODM2NzE5MTo2NEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01uU3diSUdFTlM3c3NBR0dCUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjkzZW80bjlCQ2ZtZ2w2Qkc1MUZ6cmRyMDNLRGVJUHgzdldHY21Vd0w0V2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjhEWXgyUU5CRTdIY0owMEZ2dW5nZmU5YUJzRFZ0aHpsNWM0R1AxNis1MHl5a2tzR2d5Ymg1aHQzcFE3cnR6U1IycVNyQThUNzgzeXI3K3FlL1lwYkRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJGNnFMZ3liaEIwQ0xuQ0l5OWtRL1RyaEtMWGlpSlc4SDUwdzBwTXUvY0JUbVBheUE4WW96NE1YbjNobHpBYU8wb3c0eWVYZ0JSYyt1WFFBclRQUmRoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNTA1MTA5MzU6NjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmQzcU9KL1FRbjVvSmVnUnVkUmM2M2E5TnlnM2lEOGQ3MWhuSmxNQytGbiJ9fV0sInBsYXRmb3JtIjoic21iaSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1NjU3MzEzLCJsYXN0UHJvcEhhc2giOiJubTNCYiJ9",
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
