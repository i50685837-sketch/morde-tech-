const { exec } = require("child_process");

module.exports = {
    name: "update",
    aliases: ["upgrade", "gitpull"],
    description: "Update Morde-Tech bot from GitHub",
    owner: true,

    async execute(sock, msg) {

        const jid = msg.key.remoteJid;


        try {

            await sock.sendMessage(jid, {
                text:
`🔄 *MORDE-TECH UPDATE*

Checking for updates...

Please wait.`
            });



            exec(
                "git pull",
                async (error, stdout, stderr) => {


                if (error) {

                    return sock.sendMessage(jid,{
                        text:
`❌ Update failed

${error.message}`
                    });

                }



                await sock.sendMessage(jid,{
                    text:
`✅ *Update Complete*

📦 Git Response:

\`\`\`
${stdout || stderr || "No changes"}
\`\`\`

♻️ Restart the bot to apply changes.`
                });


            });


        } catch(error) {

            console.error(error);


            await sock.sendMessage(jid,{
                text:
"❌ Update system error."
            });

        }

    }
};
