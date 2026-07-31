const fs = require("fs");
const path = require("path");

module.exports = {
    name: "backup",
    aliases: ["bk", "databasebackup"],
    description: "Backup the bot database",
    owner: true,

    async execute(sock, msg) {
        const jid = msg.key.remoteJid;

        try {
            const databaseDir = path.join(__dirname, "../../database");

            if (!fs.existsSync(databaseDir)) {
                return await sock.sendMessage(jid, {
                    text: "❌ Database folder not found."
                });
            }

            const backupDir = path.join(__dirname, "../../backups");

            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir);
            }

            const date = new Date()
                .toISOString()
                .replace(/:/g, "-")
                .replace(/\..+/, "");

            const backupFile = path.join(
                backupDir,
                `morde-tech-backup-${date}.json`
            );

            const backup = {};

            const files = fs.readdirSync(databaseDir);

            for (const file of files) {
                if (file.endsWith(".json")) {
                    const filePath = path.join(databaseDir, file);
                    backup[file] = JSON.parse(fs.readFileSync(filePath));
                }
            }

            fs.writeFileSync(
                backupFile,
                JSON.stringify(backup, null, 2)
            );

            await sock.sendMessage(
                jid,
                {
                    document: fs.readFileSync(backupFile),
                    fileName: path.basename(backupFile),
                    mimetype: "application/json",
                    caption:
`✅ Morde-Tech Backup Created Successfully

📅 ${date}
📂 Files: ${files.length}

Keep this backup safe.`
                }
            );

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Failed to create backup."
            });
        }
    }
};
