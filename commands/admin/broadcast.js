const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../../database/users.json");

function loadUsers() {
    if (!fs.existsSync(usersPath)) {
        fs.writeFileSync(usersPath, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(usersPath));
}

module.exports = {
    name: "broadcast",
    aliases: ["bc"],
    description: "Broadcast a message to registered users",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const text = args.join(" ");

        if (!text) {
            return sock.sendMessage(jid, {
                text: `📢 *Broadcast*

Usage:
.broadcast Your announcement here`
            });
        }

        const users = loadUsers();

        if (!users.length) {
            return sock.sendMessage(jid, {
                text: "❌ No registered users found."
            });
        }

        let sent = 0;
        let failed = 0;

        for (const user of users) {
            try {
                await sock.sendMessage(user, {
                    text: `📢 *Morde-Tech Announcement*\n\n${text}`
                });

                sent++;

                // Small delay between messages
                await new Promise(resolve => setTimeout(resolve, 1500));

            } catch (err) {
                failed++;
            }
        }

        await sock.sendMessage(jid, {
            text:
`✅ Broadcast Complete

📨 Sent: ${sent}
❌ Failed: ${failed}
👥 Total: ${users.length}`
        });
    }
};
