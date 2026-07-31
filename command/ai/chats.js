module.exports = {
    name: "chat",
    description: "Simple chatbot",

    async execute(sock, msg, args) {
        const question = args.join(" ");

        if (!question) {
            return sock.sendMessage(msg.key.remoteJid, {
                text: "Example:\n.chat How are you?"
            });
        }

        await sock.sendMessage(msg.key.remoteJid, {
            text: "🤖 I'm here! Connect an AI API to generate intelligent responses."
        });
    }
};
