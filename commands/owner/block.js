module.exports = {
    name: "block",
    aliases: ["blockuser"],
    description: "Block a WhatsApp user",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        let user = args[0];

        if (!user) {
            return sock.sendMessage(jid, {
                text:
`🚫 *MORDE-TECH BLOCK USER*

Usage:
.block <number>

Example:
.block 254712345678`
            });
        }


        // Remove symbols and format number
        user = user.replace(/[^0-9]/g, "");

        const target =
            user + "@s.whatsapp.net";


        try {

            await sock.updateBlockStatus(
                target,
                "block"
            );


            await sock.sendMessage(jid, {
                text:
`✅ User Blocked

👤 Number:
+${user}`
            });


        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid, {
                text:
"❌ Failed to block user."
            });

        }

    }
};
