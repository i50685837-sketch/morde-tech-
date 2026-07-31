module.exports = {
    name: "explain",
    aliases: ["exp", "why"],
    description: "Explain a topic in simple terms",

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const topic = args.join(" ");

        if (!topic) {
            return await sock.sendMessage(jid, {
                text: `📖 *Morde-Tech Explain*

Usage:
.explain <topic>

Examples:
.explain JavaScript
.explain Blockchain
.explain Photosynthesis`
            });
        }

        try {
            // Replace this placeholder with your AI API.
            const explanation =
                `📚 *Explanation: ${topic}*\n\n` +
                `${topic} is an interesting subject. Connect your preferred AI service to generate a detailed, accurate explanation for any topic.`;

            await sock.sendMessage(jid, {
                text: explanation
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Unable to explain the topic right now. Please try again later."
            });
        }
    }
};
