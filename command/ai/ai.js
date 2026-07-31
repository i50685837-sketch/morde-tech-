module.exports = {
    name: "ai",
    description: "AI Chat",

    async execute(sock, msg, args) {
        const text = args.join(" ");

        if (!text) {
            return sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Example:\n.ai Hello"
            });
        }

        // Replace this with your AI API call.
        const reply = `🤖 AI Response:\n\nYou said: ${text}`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: reply
        });
    }
};
