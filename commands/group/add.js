module.exports = {
    name: "add",
    aliases: ["adduser"],
    description: "Add a user to the group",
    
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



        let number = args[0];


        if (!number) {
            return sock.sendMessage(jid,{
                text:
`➕ *MORDE-TECH ADD USER*

Usage:
.add <number>

Example:
.add 254712345678`
            });
        }



        number = number.replace(
            /[^0-9]/g,
            ""
        );


        const user =
            number + "@s.whatsapp.net";



        try {

            await sock.groupParticipantsUpdate(
                jid,
                [user],
                "add"
            );


            await sock.sendMessage(jid,{
                text:
`✅ User added successfully

👤 Number:
+${number}`
            });


        } catch(error){

            console.error(error);

            await sock.sendMessage(jid,{
                text:
`❌ Failed to add user.

Possible reasons:
• User blocked group adds
• Bot is not admin
• Invalid number`
            });

        }

    }
};
