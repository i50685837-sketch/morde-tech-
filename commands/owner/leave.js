module.exports = {
    name: "leave",
    aliases: ["leavegroup", "out"],
    description: "Leave a WhatsApp group",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;


        // Must be used in a group
        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
                text:
"❌ This command can only be used inside a group."
            });
        }


        try {

            await sock.sendMessage(jid, {
                text:
`👋 *MORDE-TECH*

Leaving this group...

Thank you for using Morde-Tech Bot 🤖`
            });


            // Small delay for message delivery
            setTimeout(async () => {

                await sock.groupLeave(jid);

            }, 2000);



        } catch (error) {

            console.error(error);


            await sock.sendMessage(jid, {
                text:
"❌ Failed to leave group."
            });

        }

    }
};
