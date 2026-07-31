const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../../database/settings.json");

function loadSettings() {
    if (!fs.existsSync(settingsPath)) {
        fs.writeFileSync(settingsPath, JSON.stringify({
            mode: "public"
        }, null, 2));
    }

    return JSON.parse(fs.readFileSync(settingsPath));
}

function saveSettings(data) {
    fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
}

module.exports = {
    name: "mode",
    aliases: ["botmode", "publicmode"],
    description: "Change the bot operating mode",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        const settings = loadSettings();

        if (!args[0]) {
            return await sock.sendMessage(jid, {
                text:
`🤖 *Morde-Tech Mode*

Current Mode:
${settings.mode.toUpperCase()}

Available Modes:

🌍 public
👑 owner
👥 group
💬 private

Usage:
.mode public
.mode owner
.mode group
.mode private
.mode status`
            });
        }

        const mode = args[0].toLowerCase();

        if (mode === "status") {
            return await sock.sendMessage(jid, {
                text: `🤖 Current Bot Mode: *${settings.mode.toUpperCase()}*`
            });
        }

        const modes = [
            "public",
            "owner",
            "group",
            "private"
        ];

        if (!modes.includes(mode)) {
            return await sock.sendMessage(jid, {
                text: "❌ Invalid mode."
            });
        }

        settings.mode = mode;
        saveSettings(settings);

        await sock.sendMessage(jid, {
            text:
`✅ Bot mode changed successfully.

Current Mode:
${mode.toUpperCase()}`
        });
    }
};
