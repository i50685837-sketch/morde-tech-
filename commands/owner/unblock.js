module.exports = {
    name: "unblock",
    aliases: ["unblockuser"],
    description: "Unblock a WhatsApp user",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        let user = args[0];

        if (!user) {
            return sock.sendMessage(jid, {
                text:
`✅ *MORDE-TECH UNBLOCK USER*

Usage:
.unblock <number>

Example:
.unblock 254712345678`
            });
        }


        // Clean number
        user = user.replace(/[^0-9]/g, "");


        const target =
            user + "@s.whatsapp.net";


        try {

            await sock.updateBlockStatus(
                target,
                "unblock"
            );


            await sock.sendMessage(jid, {
                text:
`✅ User Unblocked

👤 Number:
+${user}`
            });


        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid, {
                text:
"❌ Failed to unblock user."
            });

        }

    }
};
