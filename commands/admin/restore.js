const fs = require("fs");
const path = require("path");

module.exports = {
    name: "restore",
    aliases: ["recover", "dbrestore"],
    description: "Restore the bot database from a backup",
    owner: true,

    async execute(sock, msg) {
        const jid = msg.key.remoteJid;

        try {
            const backupDir = path.join(__dirname, "../../backups");
            const databaseDir = path.join(__dirname, "../../database");

            if (!fs.existsSync(backupDir)) {
                return await sock.sendMessage(jid, {
                    text: "❌ No backup folder found."
                });
            }

            const backups = fs.readdirSync(backupDir)
                .filter(file => file.endsWith(".json"))
                .sort()
                .reverse();

            if (backups.length === 0) {
                return await sock.sendMessage(jid, {
                    text: "❌ No backup files available."
                });
            }

            const latestBackup = path.join(backupDir, backups[0]);

            const backupData = JSON.parse(
                fs.readFileSync(latestBackup, "utf8")
            );

            if (!fs.existsSync(databaseDir)) {
                fs.mkdirSync(databaseDir, { recursive: true });
            }

            let restored = 0;

            for (const file in backupData) {
                fs.writeFileSync(
                    path.join(databaseDir, file),
                    JSON.stringify(backupData[file], null, 2)
                );

                restored++;
            }

            await sock.sendMessage(jid, {
                text:
`✅ *Morde-Tech Restore Complete*

📂 Backup:
${backups[0]}

📄 Files Restored:
${restored}

♻️ Restart the bot to apply all restored data.`
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Failed to restore the backup."
            });
        }
    }
};
