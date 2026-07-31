const { exec } = require("child_process");

module.exports = {
    name: "update",
    aliases: ["checkupdate", "updates"],
    description: "Check for bot updates",
    owner: true,

    async execute(sock, msg) {
        const jid = msg.key.remoteJid;

        await sock.sendMessage(jid, {
            text: "🔄 Checking for updates..."
        });

        exec("git fetch && git status", async (error, stdout, stderr) => {
            if (error) {
                return await sock.sendMessage(jid, {
                    text: `❌ Failed to check updates.\n\n${stderr || error.message}`
                });
            }

            let message;

            if (stdout.includes("Your branch is behind")) {
                message = `🚀 *Update Available!*

Your local repository is behind the remote.

Run the appropriate Git commands (for example, \`git pull\`) when you're ready to update.`;
            } else if (stdout.includes("up to date")) {
                message = `✅ *Morde-Tech*

Your bot is already up to date.`;
            } else {
                message = `📄 *Git Status*

\`\`\`
${stdout}
\`\`\``;
            }

            await sock.sendMessage(jid, {
                text: message
            });
        });
    }
};
