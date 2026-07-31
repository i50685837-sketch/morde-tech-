const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../../database/warnings.json");

function loadWarnings() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({}, null, 2));
    }
    return JSON.parse(fs.readFileSync(dbPath));
}

function saveWarnings(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
    name: "unwarn",
    aliases: ["removewarn", "clearwarn"],
    description: "Remove one warning from a user",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        const target =
            msg.message?.extendedTextMessage?.contextInfo?.participant ||
            args[0];

        if (!target) {
            return sock.sendMessage(jid, {
                text: `❌ Reply to a user's message or provide their WhatsApp JID.

Example:
.unwarn @user`
            });
        }

        const warnings = loadWarnings();

        if (!warnings[target]) {
            return sock.sendMessage(jid, {
                text: "⚠️ This user has no warnings."
            });
        }

        warnings[target].count--;

        if (warnings[target].reasons.length > 0) {
            warnings[target].reasons.pop();
        }

        if (warnings[target].count <= 0) {
            delete warnings[target];
        }

        saveWarnings(warnings);

        await sock.sendMessage(jid, {
            text: `✅ *Warning Removed Successfully*

👤 User: ${target}
📌 Remaining Warnings: ${warnings[target]?.count || 0}`
        });
    }
};
