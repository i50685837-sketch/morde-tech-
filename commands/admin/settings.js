const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../../database/settings.json");

function loadSettings() {
    if (!fs.existsSync(settingsPath)) {
        fs.writeFileSync(
            settingsPath,
            JSON.stringify({
                prefix: ".",
                mode: "public",
                maintenance: false,
                autoRead: true,
                autoTyping: false,
                autoRecording: false,
                antiDelete: true,
                antiLink: false,
                welcome: true,
                goodbye: true
            }, null, 2)
        );
    }

    return JSON.parse(fs.readFileSync(settingsPath));
}

function saveSettings(data) {
    fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
}

module.exports = {
    name: "settings",
    aliases: ["config", "botsettings"],
    description: "View or edit bot settings",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const settings = loadSettings();

        if (!args.length) {
            return await sock.sendMessage(jid, {
                text: `╭━━━〔 ⚙️ MORDE-TECH SETTINGS 〕━━━⬣

🔹 Prefix: ${settings.prefix}
🌍 Mode: ${settings.mode}
🛠️ Maintenance: ${settings.maintenance ? "ON" : "OFF"}
👁️ Auto Read: ${settings.autoRead ? "ON" : "OFF"}
⌨️ Auto Typing: ${settings.autoTyping ? "ON" : "OFF"}
🎤 Auto Recording: ${settings.autoRecording ? "ON" : "OFF"}
🛡️ Anti Delete: ${settings.antiDelete ? "ON" : "OFF"}
🚫 Anti Link: ${settings.antiLink ? "ON" : "OFF"}
👋 Welcome: ${settings.welcome ? "ON" : "OFF"}
👋 Goodbye: ${settings.goodbye ? "ON" : "OFF"}

━━━━━━━━━━━━━━━━━━

Usage:
.settings <option> <on/off>

Example:
.settings antilink on
.settings autoread off

╰━━━━━━━━━━━━━━━━━━⬣`
            });
        }

        const option = args[0].toLowerCase();
        const value = args[1]?.toLowerCase();

        if (!value || !["on", "off"].includes(value)) {
            return await sock.sendMessage(jid, {
                text: "❌ Value must be 'on' or 'off'."
            });
        }

        const bool = value === "on";

        switch (option) {
            case "autoread":
                settings.autoRead = bool;
                break;

            case "autotyping":
                settings.autoTyping = bool;
                break;

            case "autorecording":
                settings.autoRecording = bool;
                break;

            case "antidelete":
                settings.antiDelete = bool;
                break;

            case "antilink":
                settings.antiLink = bool;
                break;

            case "welcome":
                settings.welcome = bool;
                break;

            case "goodbye":
                settings.goodbye = bool;
                break;

            default:
                return await sock.sendMessage(jid, {
                    text: "❌ Unknown setting."
                });
        }

        saveSettings(settings);

        await sock.sendMessage(jid, {
            text: `✅ *Setting Updated Successfully*

⚙️ ${option} → ${value.toUpperCase()}`
        });
    }
};
