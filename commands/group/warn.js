const fs = require("fs");
const path = require("path");

const warnPath = path.join(
    __dirname,
    "../../database/warnings.json"
);


function loadWarnings() {

    if (!fs.existsSync(warnPath)) {

        fs.writeFileSync(
            warnPath,
            JSON.stringify({}, null, 2)
        );

    }

    return JSON.parse(
        fs.readFileSync(warnPath)
    );

}



function saveWarnings(data) {

    fs.writeFileSync(
        warnPath,
        JSON.stringify(data, null, 2)
    );

}



module.exports = {

    name: "warn",
    aliases: ["warning"],
    description: "Warn a group member",


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



        let number =
            args[0];



        if (!number) {

            return sock.sendMessage(jid,{
                text:
`⚠️ *MORDE-TECH WARN*

Usage:
.warn <number>

Example:
.warn 254712345678`
            });

        }



        number =
            number.replace(
                /[^0-9]/g,
                ""
            );



        const user =
            number + "@s.whatsapp.net";



        const warnings =
            loadWarnings();



        if (!warnings[user]) {

            warnings[user] = 0;

        }



        warnings[user]++;



        saveWarnings(warnings);



        await sock.sendMessage(jid,{
            text:
`⚠️ Warning Added

👤 User:
+${number}

Warnings:
${warnings[user]}/3`
        });



        if (warnings[user] >= 3) {

            await sock.sendMessage(jid,{
                text:
`🚫 User reached 3 warnings.

Admin action required.`
            });

        }


    }
};
