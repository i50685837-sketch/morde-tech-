module.exports = {
    name: "translate",
    aliases: ["tr"],
    description: "Translate text into another language",

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;

        if (args.length < 2) {
            return await sock.sendMessage(jid, {
                text: `🌍 *Morde-Tech Translator*

Usage:
.translate <language_code> <text>

Examples:
.translate sw Hello world
.translate en Habari yako
.translate fr Good morning`
            });
        }

        const language = args.shift().toLowerCase();
        const text = args.join(" ");

        try {
            // Replace this with your translation API.
            const translatedText = `[${language}] ${text}`;

            await sock.sendMessage(jid, {
                text: `🌐 *Translation Complete*

📝 Original:
${text}

✅ Translated (${language}):
${translatedText}`
            });

        } catch (error) {
            console.error(error);

            await sock.sendMessage(jid, {
                text: "❌ Translation failed. Please try again later."
            });
        }
    }
};
