module.exports = {
    name: "link",
    aliases: ["grouplink", "invite"],
    description: "Get group invite link",

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


            const code =
                await sock.groupInviteCode(jid);



            const invite =
                `https://chat.whatsapp.com/${code}`;



            await sock.sendMessage(jid,{
                text:
`🔗 *GROUP INVITE LINK*

${invite}

👥 Share responsibly.

🤖 Morde-Tech Bot 🔥`
            });



        } catch(error) {

            console.error(error);


            await sock.sendMessage(jid,{
                text:
"❌ Failed to get group link. Make sure bot is admin."
            });

        }

    }
};
