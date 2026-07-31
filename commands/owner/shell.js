const { exec } = require("child_process");

module.exports = {
    name: "shell",
    aliases: ["sh", "terminal"],
    description: "Run shell commands",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        if (!args.length) {
            return sock.sendMessage(jid, {
                text:
`🐚 *MORDE-TECH SHELL*

Usage:
.shell <command>

Example:
.shell pwd`
            });
        }


        const command = args.join(" ");


        await sock.sendMessage(jid, {
            text:
`🐚 Running shell command...

\`\`\`
${command}
\`\`\``
        });



        exec(command, {
            timeout: 30000
        }, async (error, stdout, stderr) => {


            if (error) {

                return sock.sendMessage(jid, {
                    text:
`❌ Shell Error

\`\`\`
${error.message}
\`\`\``
                });

            }


            const output =
                stdout ||
                stderr ||
                "No output returned.";


            await sock.sendMessage(jid, {
                text:
`✅ *Shell Output*

\`\`\`
${output.slice(0, 4000)}
\`\`\``
            });


        });

    }
};
