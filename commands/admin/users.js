const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../../database/users.json");

function loadUsers() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
    }

    return JSON.parse(fs.readFileSync(dbPath));
}

module.exports = {
    name: "users",
    aliases: ["allusers", "registered"],
    description: "View registered bot users",
    owner: true,

    async execute(sock, msg) {
        const jid = msg.key.remoteJid;

        try {
            const users = loadUsers();

            if (!users.length) {
                return await sock.sendMessage(jid, {
                    text: "👤 No registered users found."
                });
            }

            let text = `👥 *Morde-Tech Registered Users*\n\n`;
            text += `📊 Total Users: ${users.length}\n\n`;

            users.forEach((user, index) => {
                text += `${index + 1}. ${user}\n`;
            });

            await sock.sendMessage(jid, {
                text
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Failed to load users."
            });
        }
    }
};
