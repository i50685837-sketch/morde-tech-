const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../../database/muted.json");

function loadMuted() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(dbPath));
}

function saveMuted(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
    name: "mute",
    aliases: ["silence"],
    description: "Mute a user from using the bot",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        const target =
            msg.message?.extendedTextMessage?.contextInfo?.participant ||
            args[0];

        if (!target) {
            return sock.sendMessage(jid, {
                text: `🔇 *Mute Command*

Reply to a user's message or provide their WhatsApp JID.

Example:
.mute
.mute 254712345678@s.whatsapp.net`
            });
        }

        const muted = loadMuted();

        if (muted.includes(target)) {
            return sock.sendMessage(jid, {
                text: "⚠️ This user is already muted."
            });
        }

        muted.push(target);
        saveMuted(muted);

        await sock.sendMessage(jid, {
            text: `🔇 *User Muted Successfully*

👤 User:
${target}

The user can no longer use Morde-Tech commands until unmuted.`
        });
    }
};
