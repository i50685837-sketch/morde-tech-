const fs = require("fs");
const path = require("path");

const mutedPath = path.join(
    __dirname,
    "../../database/muted.json"
);


function loadMuted() {

    if (!fs.existsSync(mutedPath)) {

        fs.writeFileSync(
            mutedPath,
            JSON.stringify([], null, 2)
        );

    }

    return JSON.parse(
        fs.readFileSync(mutedPath)
    );

}



function saveMuted(data) {

    fs.writeFileSync(
        mutedPath,
        JSON.stringify(data, null, 2)
    );

}



module.exports = {

    name: "unmute",
    aliases: ["unsilence"],
    description: "Remove mute from a user",


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
`🔊 *MORDE-TECH UNMUTE*

Usage:
.unmute <number>

Example:
.unmute 254712345678`
            });

        }



        number =
            number.replace(
                /[^0-9]/g,
                ""
            );



        const user =
            number + "@s.whatsapp.net";



        let muted =
            loadMuted();



        muted =
            muted.filter(
                id => id !== user
            );



        saveMuted(muted);



        await sock.sendMessage(jid,{
            text:
`🔊 User unmuted

👤 Number:
+${number}

They can use bot commands again.`
        });


    }
};
