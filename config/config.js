require("dotenv").config();

module.exports = {
    botName: process.env.BOT_NAME || "Morde-Tech",
    ownerName: process.env.OWNER_NAME || "Mordecai",
    ownerNumber: process.env.OWNER_NUMBER || "2547XXXXXXXX",
    prefix: process.env.PREFIX || ".",
    timezone: process.env.TIMEZONE || "Africa/Nairobi",
    sessionPath: process.env.SESSION_FOLDER || "./session",
    port: process.env.PORT || 3000
};
