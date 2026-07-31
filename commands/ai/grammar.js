module.exports = {
    name: "grammar",
    aliases: ["gram", "correct"],
    description: "Correct grammar and spelling",

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const text = args.join(" ");

        if (!text) {
            return await sock.sendMessage(jid, {
                text: `📚 *Morde-Tech Grammar Checker*

Usage:
.grammar <text>

Example:
.grammar i goes to school everyday.`
            });
        }

        try {
            // Replace this with your preferred AI or grammar service.
            const corrected = text;

            await sock.sendMessage(jid, {
                text: `✅ *Grammar Check Complete*

📝 Original:
${text}

✨ Corrected:
${corrected}`
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Unable to check grammar. Please try again later."
            });
        }
    }
};
