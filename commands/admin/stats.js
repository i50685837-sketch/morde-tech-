const os = require("os");
const fs = require("fs");
const path = require("path");

module.exports = {
    name: "stats",
    aliases: ["status", "botstats"],
    description: "Display Morde-Tech bot statistics",
    owner: true,

    async execute(sock, msg) {
        const jid = msg.key.remoteJid;

        try {
            const usersFile = path.join(__dirname, "../../database/users.json");
            const bannedFile = path.join(__dirname, "../../database/banned.json");
            const mutedFile = path.join(__dirname, "../../database/muted.json");
            const warnFile = path.join(__dirname, "../../database/warnings.json");

            const users = fs.existsSync(usersFile)
                ? JSON.parse(fs.readFileSync(usersFile))
                : [];

            const banned = fs.existsSync(bannedFile)
                ? JSON.parse(fs.readFileSync(bannedFile))
                : [];

            const muted = fs.existsSync(mutedFile)
                ? JSON.parse(fs.readFileSync(mutedFile))
                : [];

            const warnings = fs.existsSync(warnFile)
                ? JSON.parse(fs.readFileSync(warnFile))
                : {};

            const groups = await sock.groupFetchAllParticipating();

            const uptime = process.uptime();

            const days = Math.floor(uptime / 86400);
            const hours = Math.floor((uptime % 86400) / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);

            const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
            const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

            const cpu = os.cpus()[0].model;

            const text = `╭━━━〔 📊 MORDE-TECH STATS 〕━━━⬣

🤖 Bot Name : Morde-Tech
🟢 Status : Online
⚡ Platform : ${os.platform()}
🖥️ CPU : ${cpu}
💾 RAM Used : ${usedMemory} MB
💽 Total RAM : ${totalMemory} GB

━━━━━━━━━━━━━━━━━━

👥 Users : ${users.length}
👥 Groups : ${Object.keys(groups).length}
🚫 Banned : ${banned.length}
🔇 Muted : ${muted.length}
⚠️ Warned : ${Object.keys(warnings).length}

━━━━━━━━━━━━━━━━━━

⏳ Uptime
${days}d ${hours}h ${minutes}m ${seconds}s

━━━━━━━━━━━━━━━━━━

🚀 Version : 1.0.0
👑 Owner : Mordecai

╰━━━━━━━━━━━━━━━━━━⬣`;

            await sock.sendMessage(jid, {
                text
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Failed to retrieve bot statistics."
            });
        }
    }
};
