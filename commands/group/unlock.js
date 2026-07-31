module.exports = {
    name: "unlock",
    aliases: ["open"],
    description: "Allow everyone to send messages",

    async execute(sock, msg) {

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



        try {


            await sock.groupSettingUpdate(
                jid,
                "not_announcement"
            );



            await sock.sendMessage(jid,{
                text:
`🔓 *GROUP UNLOCKED*

Everyone can send messages now.

🤖 Morde-Tech Bot 🔥`
            });



        } catch(error) {

            console.error(error);


            await sock.sendMessage(jid,{
                text:
"❌ Failed to unlock group. Make sure bot is admin."
            });

        }

    }
};
