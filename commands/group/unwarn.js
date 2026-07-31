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

    name: "unwarn",
    aliases: ["delwarn", "removewarn"],
    description: "Remove a warning from a member",


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
`✅ *MORDE-TECH UNWARN*

Usage:
.unwarn <number>

Example:
.unwarn 254712345678`
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

            return sock.sendMessage(jid,{
                text:
"⚠️ This user has no warnings."
            });

        }



        warnings[user]--;



        if (warnings[user] <= 0) {

            delete warnings[user];

        }



        saveWarnings(warnings);



        await sock.sendMessage(jid,{
            text:
`✅ Warning removed

👤 User:
+${number}

Remaining:
${warnings[user] || 0}/3`
        });


    }
};
