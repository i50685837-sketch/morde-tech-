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
    name: "unban",
    aliases: ["unblock"],
    description: "Remove a user from the bot ban list",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        let target =
            msg.message?.extendedTextMessage?.contextInfo?.participant ||
            args[0];

        if (!target) {
            return sock.sendMessage(jid, {
                text: `❌ Reply to a user's message or provide their WhatsApp JID.

Example:
.unban 254712345678@s.whatsapp.net`
            });
        }

        const bans = loadBans();

        if (!bans.includes(target)) {
            return sock.sendMessage(jid, {
                text: "⚠️ This user is not banned."
            });
        }

        const updated = bans.filter(user => user !== target);
        saveBans(updated);

        await sock.sendMessage(jid, {
            text: `✅ User has been unbanned successfully.

👤 User: ${target}`
        });
    }
};
