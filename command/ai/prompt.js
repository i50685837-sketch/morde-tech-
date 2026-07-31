module.exports = {
    name: "prompt",
    aliases: ["ask", "gpt"],
    description: "Send a custom prompt to the AI",

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const prompt = args.join(" ");

        if (!prompt) {
            return await sock.sendMessage(jid, {
                text: `🤖 *Morde-Tech AI Prompt*

Usage:
.prompt <your question>

Examples:
.prompt Explain JavaScript promises
.prompt Write a professional email
.prompt Create a React login page
.prompt Tell me a joke`
            });
        }

        try {
            // Replace this with your preferred AI provider.
            const aiResponse =
                `🤖 *AI Response*\n\n` +
                `Prompt:\n${prompt}\n\n` +
                `Connect your AI service here to generate intelligent responses.`;

            await sock.sendMessage(jid, {
                text: aiResponse
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Unable to process your prompt. Please try again later."
            });
        }
    }
};
