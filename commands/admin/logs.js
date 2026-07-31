const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../../logs/bot.log");

module.exports = {
    name: "logs",
    aliases: ["log"],
    description: "View recent bot logs",
    owner: true,

    async execute(sock, msg) {
        const jid = msg.key.remoteJid;

        try {
            if (!fs.existsSync(logPath)) {
                return await sock.sendMessage(jid, {
                    text: "📄 No log file found."
                });
            }

            const content = fs.readFileSync(logPath, "utf8");

            if (!content.trim()) {
                return await sock.sendMessage(jid, {
                    text: "📄 Log file is empty."
                });
            }

            // Show only the last 30 lines
            const lines = content.trim().split("\n");
            const recentLogs = lines.slice(-30).join("\n");

            await sock.sendMessage(jid, {
                text:
`📜 *Morde-Tech Logs*

\`\`\`
${recentLogs}
\`\`\``
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Failed to read the log file."
            });
        }
    }
};
