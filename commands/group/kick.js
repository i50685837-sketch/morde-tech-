module.exports = {
    name: "kick",
    aliases: ["remove", "banuser"],
    description: "Remove a member from group",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;


        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
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
"❌ Only group admins can use this command."
            });
        }



        let number =
            args[0];


        if (!number) {

            return sock.sendMessage(jid,{
                text:
`👢 *MORDE-TECH KICK*

Usage:
.kick <number>

Example:
.kick 254712345678`
            });

        }



        number =
            number.replace(
                /[^0-9]/g,
                ""
            );



        const user =
            number + "@s.whatsapp.net";



        try {


            await sock.groupParticipantsUpdate(
                jid,
                [user],
                "remove"
            );



            await sock.sendMessage(jid,{
                text:
`✅ Member removed

👤 Number:
+${number}`
            });



        } catch(error){


            console.error(error);


            await sock.sendMessage(jid,{
                text:
`❌ Failed to remove member.

Possible reasons:
• Bot is not admin
• Invalid number
• User already left`
            });

        }

    }
};
