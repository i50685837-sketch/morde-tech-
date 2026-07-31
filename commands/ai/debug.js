module.exports = {
    name: "debug",
    aliases: ["fix", "bug"],
    description: "Analyze and help debug code",

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const code = args.join(" ");

        if (!code) {
            return await sock.sendMessage(jid, {
                text: `🐞 *Morde-Tech Debugger*

Usage:
.debug <code>

Examples:
.debug console.log(name)
.debug const x == 10
.debug TypeError: Cannot read properties of undefined`
            });
        }

        try {
            // Replace this with your AI debugging service.
            const result = `🐞 *Debug Analysis*

Issue:
${code}

Possible Solution:
• Check your syntax.
• Verify variable names.
• Ensure required modules are installed.
• Review the full error message and stack trace.

💡 Connect your preferred AI service for detailed debugging suggestions.`;

            await sock.sendMessage(jid, {
                text: result
            });

        } catch (error) {
            console.error(error);

            await sock.sendMessage(jid, {
                text: "❌ Unable to analyze the code at the moment."
            });
        }
    }
};
