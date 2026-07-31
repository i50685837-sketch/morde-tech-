module.exports = {
    name: "rewrite",
    aliases: ["rw", "paraphrase"],
    description: "Rewrite text in a clearer way",

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const text = args.join(" ");

        if (!text) {
            return await sock.sendMessage(jid, {
                text: `✍️ *Morde-Tech Rewrite*

Usage:
.rewrite <text>

Example:
.rewrite I am very happy because I got a new job today.`
            });
        }

        try {
            // Replace this with your AI rewrite API.
            const rewritten =
                `✨ Rewritten Version:\n\n${text}`;

            await sock.sendMessage(jid, {
                text: `📝 *Text Rewritten Successfully*\n\n${rewritten}`
            });

        } catch (error) {
            console.error(error);

            await sock.sendMessage(jid, {
                text: "❌ Failed to rewrite the text."
            });
        }
    }
};
