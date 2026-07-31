module.exports = {
    name: "summarize",
    aliases: ["sum", "summary"],
    description: "Summarize long text",

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        const text = args.join(" ");

        if (!text) {
            return await sock.sendMessage(jid, {
                text: `📝 *Morde-Tech Summarizer*

Usage:
.summarize <text>

Example:
.summarize Artificial Intelligence is changing the world by helping people automate tasks and improve productivity...`
            });
        }

        try {
            // Replace this with your AI summarization API.
            const summary = `Summary:\n\n${text.substring(0, 150)}${text.length > 150 ? "..." : ""}`;

            await sock.sendMessage(jid, {
                text: `🤖 *Summary Complete*

${summary}`
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Failed to summarize the text. Please try again later."
            });
        }
    }
};
