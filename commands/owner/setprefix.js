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
                prefix: "."
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

    name: "setprefix",
    aliases: ["prefix"],
    description: "Change bot command prefix",
    owner: true,


    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;


        const newPrefix = args[0];


        if (!newPrefix) {

            return sock.sendMessage(jid,{
                text:
`⚙️ *MORDE-TECH PREFIX*

Current prefix:
Check database/settings.json

Usage:
.setprefix <symbol>

Example:
.setprefix !

New commands:
!menu
!help`
            });

        }



        if (newPrefix.length > 3) {

            return sock.sendMessage(jid,{
                text:
"❌ Prefix must be 1-3 characters."
            });

        }



        const settings = loadSettings();


        settings.prefix = newPrefix;


        saveSettings(settings);



        await sock.sendMessage(jid,{
            text:
`✅ Prefix Updated

New Prefix:
${newPrefix}

Example:
${newPrefix}menu`
        });


    }

};
