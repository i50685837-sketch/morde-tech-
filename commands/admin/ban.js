const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../../database/banned.json");

function loadBans() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(dbPath));
}

function saveBans(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
    name: "ban",
    aliases: ["block"],
    description: "Ban a user from using the bot",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        let target =
            msg.message?.extendedTextMessage?.contextInfo?.participant ||
            args[0];

        if (!target) {
            return sock.sendMessage(jid, {
                text: "❌ Reply to a user's message or provide their WhatsApp JID.\n\nExample:\n.ban 254712345678@s.whatsapp.net"
            });
        }

        const bans = loadBans();

        if (bans.includes(target)) {
            return sock.sendMessage(jid, {
                text: "⚠️ That user is already banned."
            });
        }

        bans.push(target);
        saveBans(bans);

        await sock.sendMessage(jid, {
            text: `🚫 User banned successfully.\n\nUser: ${target}`
        });
    }
};
