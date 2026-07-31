module.exports = {
    name: "join",
    aliases: ["joingroup"],
    description: "Join a WhatsApp group using invite link",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        const link = args[0];


        if (!link) {
            return sock.sendMessage(jid, {
                text:
`🔗 *MORDE-TECH JOIN GROUP*

Usage:
.join <group invite link>

Example:
.join https://chat.whatsapp.com/XXXXXXXX`
            });
        }


        try {

            const code =
                link.split("chat.whatsapp.com/")[1];


            if (!code) {
                return sock.sendMessage(jid, {
                    text:
"❌ Invalid WhatsApp group invite link."
                });
            }



            await sock.groupAcceptInvite(code);



            await sock.sendMessage(jid, {
                text:
`✅ Successfully joined group

🔗 Invite:
${link}`
            });



        } catch (error) {

            console.error(error);


            await sock.sendMessage(jid, {
                text:
`❌ Failed to join group.

Possible reasons:
• Invalid invite link
• Invite expired
• Bot cannot join`
            });

        }

    }
};
