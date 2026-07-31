const fs = require("fs");
const path = require("path");

const settingsPath = path.join(
    __dirname,
    "../../database/settings.json"
);


function loadSettings() {

    if (!fs.existsSync(settingsPath)) {

        fs.writeFileSync(
            settingsPath,
            JSON.stringify({
                privateMode: false
            }, null, 2)
        );

    }

    return JSON.parse(
        fs.readFileSync(settingsPath)
    );
}


function saveSettings(data) {

    fs.writeFileSync(
        settingsPath,
        JSON.stringify(data, null, 2)
    );

}


module.exports = {

    name: "private",
    aliases: ["privatemode"],
    description: "Enable or disable private mode",
    owner: true,


    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        const settings = loadSettings();



        if (!args[0]) {

            return sock.sendMessage(jid,{
                text:
`🔒 *MORDE-TECH PRIVATE MODE*

Current Status:
${settings.privateMode ? "🟢 ON" : "🔴 OFF"}

Usage:
.private on
.private off`
            });

        }



        const option =
            args[0].toLowerCase();



        if (option === "on") {

            settings.privateMode = true;

        } 

        else if (option === "off") {

            settings.privateMode = false;

        } 

        else {

            return sock.sendMessage(jid,{
                text:
"❌ Use: .private on/off"
            });

        }



        saveSettings(settings);



        await sock.sendMessage(jid,{
            text:
`✅ Private Mode Updated

Status:
${settings.privateMode ? "🟢 ENABLED" : "🔴 DISABLED"}`
        });

    }

};
