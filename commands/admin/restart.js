module.exports = {
    name: "restart",
    aliases: ["reboot"],
    description: "Restart the bot",
    owner: true,

    async execute(sock, msg) {
        const jid = msg.key.remoteJid;

        try {
            await sock.sendMessage(jid, {
                text: `♻️ *Morde-Tech*

Restarting the bot...

Please wait a few seconds.`
            });

            // Give WhatsApp time to send the message
            setTimeout(() => {
                process.exit(0);
            }, 2000);

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Failed to restart the bot."
            });
        }
    }
};
