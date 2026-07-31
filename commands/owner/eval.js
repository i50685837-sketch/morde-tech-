module.exports = {
    name: "eval",
    aliases: ["ev"],
    description: "Execute JavaScript code",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        if (!args.length) {
            return sock.sendMessage(jid, {
                text:
`⚡ *MORDE-TECH EVAL*

Usage:
.eval <javascript code>

Example:
.eval 2 + 2`
            });
        }

        try {

            let code = args.join(" ");

            let result = await eval(code);

            if (typeof result !== "string") {
                result = JSON.stringify(
                    result,
                    null,
                    2
                );
            }

            await sock.sendMessage(jid, {
                text:
`✅ *Eval Result*

\`\`\`
${result}
\`\`\``
            });


        } catch (error) {

            await sock.sendMessage(jid, {
                text:
`❌ *Eval Error*

\`\`\`
${error.message}
\`\`\``
            });

        }
    }
};
