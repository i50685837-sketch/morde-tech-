module.exports = {
    name: "setstatus",
    aliases: ["status", "changestatus"],
    description: "Change WhatsApp bot status/about",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        const status = args.join(" ");


        if (!status) {
            return sock.sendMessage(jid, {
                text:
`📝 *MORDE-TECH SET STATUS*

Usage:
.setstatus <new status>

Example:
.setstatus Morde-Tech Bot 🔥 Online 24/7`
            });
        }


        try {

            await sock.updateProfileStatus(status);


            await sock.sendMessage(jid, {
                text:
`✅ Status Updated

📌 New Status:
${status}`
            });


        } catch (error) {

            console.error(error);


            await sock.sendMessage(jid, {
                text:
"❌ Failed to update WhatsApp status."
            });

        }

    }
};
