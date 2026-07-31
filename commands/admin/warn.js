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
    name: "warn",
    aliases: ["warning"],
    description: "Warn a user",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        const target =
            msg.message?.extendedTextMessage?.contextInfo?.participant ||
            args[0];

        if (!target) {
            return sock.sendMessage(jid, {
                text: `⚠️ Reply to a user's message or provide their WhatsApp JID.

Example:
.warn @user Spamming`
            });
        }

        const reason =
            args.slice(target === args[0] ? 1 : 0).join(" ") || "No reason provided";

        const warnings = loadWarnings();

        if (!warnings[target]) {
            warnings[target] = {
                count: 0,
                reasons: []
            };
        }

        warnings[target].count++;
        warnings[target].reasons.push({
            reason,
            date: new Date().toISOString()
        });

        saveWarnings(warnings);

        await sock.sendMessage(jid, {
            text: `⚠️ *User Warned Successfully*

👤 User: ${target}
📌 Warnings: ${warnings[target].count}
📝 Reason: ${reason}`
        });
    }
};
