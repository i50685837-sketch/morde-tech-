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
                goodbye: false
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

    name: "goodbye",
    aliases: ["farewell", "bye"],
    description: "Enable or disable goodbye messages",


    async execute(sock, msg, args) {


        const jid =
            msg.key.remoteJid;



        if (!jid.endsWith("@g.us")) {

            return sock.sendMessage(jid,{
                text:
                "❌ This command only works in groups."
            });

        }



        const metadata =
            await sock.groupMetadata(jid);



        const sender =
            msg.key.participant;



        const isAdmin =
            metadata.participants.some(
                p =>
                p.id === sender &&
                (
                    p.admin === "admin" ||
                    p.admin === "superadmin"
                )
            );



        if (!isAdmin) {

            return sock.sendMessage(jid,{
                text:
                "❌ Only admins can use this command."
            });

        }



        const settings =
            loadSettings();



        const option =
            args[0]?.toLowerCase();



        if (!option) {

            return sock.sendMessage(jid,{
                text:
`👋 *MORDE-TECH GOODBYE*

Status:
${settings.goodbye ? "🟢 ON" : "🔴 OFF"}

Usage:
.goodbye on
.goodbye off`
            });

        }



        if (option === "on") {

            settings.goodbye = true;

        }

        else if (option === "off") {

            settings.goodbye = false;

        }

        else {

            return sock.sendMessage(jid,{
                text:
                "❌ Use: on/off"
            });

        }



        saveSettings(settings);



        await sock.sendMessage(jid,{
            text:
`✅ Goodbye System Updated

Status:
${settings.goodbye ? "🟢 ENABLED" : "🔴 DISABLED"}`
        });


    }
};
