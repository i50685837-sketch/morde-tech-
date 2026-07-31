const { exec } = require("child_process");

module.exports = {
    name: "exec",
    aliases: ["cmd", "run"],
    description: "Execute terminal commands",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        if (!args.length) {
            return sock.sendMessage(jid, {
                text:
`⚡ *MORDE-TECH EXEC*

Usage:
.exec <command>

Example:
.exec ls`
            });
        }


        const command = args.join(" ");


        await sock.sendMessage(jid, {
            text:
`⏳ Executing:

\`\`\`
${command}
\`\`\``
        });



        exec(command, async (error, stdout, stderr) => {

            if (error) {
                return sock.sendMessage(jid, {
                    text:
`❌ *Command Error*

\`\`\`
${error.message}
\`\`\``
                });
            }


            if (stderr) {
                return sock.sendMessage(jid, {
                    text:
`⚠️ *Command Warning*

\`\`\`
${stderr}
\`\`\``
                });
            }


            await sock.sendMessage(jid, {
                text:
`✅ *Command Output*

\`\`\`
${stdout || "No output"}
\`\`\``
            });

        });

    }
};
