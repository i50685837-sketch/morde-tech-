module.exports = {
    name: "shutdown",
    aliases: ["off", "stop"],
    description: "Completely shut down the bot",
    owner: true,

    async execute(sock, msg) {
        const jid = msg.key.remoteJid;

        try {
            await sock.sendMessage(jid, {
                text: `🛑 *Morde-Tech*

Bot is shutting down...

Goodbye! 👋`
            });

            // Wait a moment so the message is sent
            setTimeout(async () => {
                try {
                    await sock.ws.close();
                } catch (e) {}

                process.exit(0);
            }, 2000);

        } catch (err) {
            console.error(err);

            process.exit(1);
        }
    }
};
