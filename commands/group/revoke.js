module.exports = {
    name: "revoke",
    aliases: ["resetlink", "newlink"],
    description: "Reset group invite link",

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


            await sock.groupRevokeInvite(jid);



            const code =
                await sock.groupInviteCode(jid);



            await sock.sendMessage(jid,{
                text:
`🔄 *INVITE LINK RESET*

Old link has been revoked.

🔗 New Link:
https://chat.whatsapp.com/${code}

🤖 Morde-Tech Bot 🔥`
            });



        } catch(error) {

            console.error(error);


            await sock.sendMessage(jid,{
                text:
"❌ Failed to reset group link. Make sure bot is admin."
            });

        }

    }
};
