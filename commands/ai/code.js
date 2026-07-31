module.exports = {
    name: "code",
    aliases: ["coding", "program"],
    description: "Generate or explain code",

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const prompt = args.join(" ");

        if (!prompt) {
            return await sock.sendMessage(jid, {
                text: `💻 *Morde-Tech Code Assistant*

Usage:
.code <request>

Examples:
.code Create a JavaScript calculator
.code Python hello world
.code HTML login page
.code Explain async await`
            });
        }

        try {
            // Replace this placeholder with your preferred AI coding service.
            const response = `💻 *Code Assistant*

Request:
${prompt}

Example Response:

// Your generated code or explanation will appear here after connecting an AI service.`;

            await sock.sendMessage(jid, {
                text: response
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Unable to process your coding request."
            });
        }
    }
};
