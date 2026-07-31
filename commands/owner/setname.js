module.exports = {
    name: "setname",
    aliases: ["botname", "changename"],
    description: "Change WhatsApp bot name",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        const name = args.join(" ");


        if (!name) {
            return sock.sendMessage(jid, {
                text:
`📝 *MORDE-TECH SET NAME*

Usage:
.setname <new name>

Example:
.setname Morde-Tech Bot 🔥`
            });
        }


        try {

            await sock.updateProfileName(name);


            await sock.sendMessage(jid, {
                text:
`✅ Bot Name Updated

🤖 New Name:
${name}`
            });


        } catch (error) {

            console.error(error);


            await sock.sendMessage(jid, {
                text:
"❌ Failed to update bot name."
            });

        }

    }
};
