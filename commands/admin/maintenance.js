const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../../database/settings.json");

function loadSettings() {
    if (!fs.existsSync(settingsPath)) {
        fs.writeFileSync(settingsPath, JSON.stringify({
            maintenance: false
        }, null, 2));
    }

    return JSON.parse(fs.readFileSync(settingsPath));
}

function saveSettings(data) {
    fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
}

module.exports = {
    name: "maintenance",
    aliases: ["maint", "repair"],
    description: "Enable or disable maintenance mode",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        const settings = loadSettings();

        if (!args[0]) {
            return await sock.sendMessage(jid, {
                text:
`🛠️ *Morde-Tech Maintenance*

Current Status:
${settings.maintenance ? "🟢 ENABLED" : "🔴 DISABLED"}

Usage:
.maintenance on
.maintenance off
.maintenance status`
            });
        }

        const option = args[0].toLowerCase();

        if (option === "status") {
            return await sock.sendMessage(jid, {
                text:
`🛠️ Maintenance Mode

Status:
${settings.maintenance ? "🟢 ENABLED" : "🔴 DISABLED"}`
            });
        }

        if (option === "on") {
            settings.maintenance = true;
            saveSettings(settings);

            return await sock.sendMessage(jid, {
                text:
`🟢 Maintenance Mode Enabled

Only the bot owner can use commands until maintenance mode is disabled.`
            });
        }

        if (option === "off") {
            settings.maintenance = false;
            saveSettings(settings);

            return await sock.sendMessage(jid, {
                text:
`🔴 Maintenance Mode Disabled

The bot is now available to all users.`
            });
        }

        await sock.sendMessage(jid, {
            text: "❌ Invalid option.\n\nUse: on, off, or status."
        });
    }
};
