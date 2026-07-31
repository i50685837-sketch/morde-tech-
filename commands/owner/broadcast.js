module.exports = {
    name: "broadcast",
    aliases: ["bc", "bcast"],
    description: "Send message to all groups",
    owner: true,

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        const message = args.join(" ");

        if (!message) {
            return sock.sendMessage(jid, {
                text:
`📢 *MORDE-TECH BROADCAST*

Usage:
.broadcast <message>

Example:
.broadcast Bot updated to v2.0 🚀`
            });
        }


        try {

            await sock.sendMessage(jid, {
                text:
`⏳ Sending broadcast...

Please wait...`
            });


            const groups =
                await sock.groupFetchAllParticipating();


            const groupIds =
                Object.keys(groups);


            let sent = 0;
            let failed = 0;



            for (const groupId of groupIds) {

                try {

                    await sock.sendMessage(groupId, {
                        text:
`╭━━━〔 📢 MORDE-TECH NEWS 〕━━━⬣

${message}

━━━━━━━━━━━━━━━━━━
🤖 Morde-Tech Bot
╰━━━━━━━━━━━━━━━━━━⬣`
                    });


                    sent++;


                    await new Promise(
                        resolve => setTimeout(resolve, 1500)
                    );


                } catch (err) {

                    failed++;

                }

            }



            await sock.sendMessage(jid, {
                text:
`✅ *Broadcast Complete*

📢 Sent:
${sent}

❌ Failed:
${failed}

👥 Total Groups:
${groupIds.length}`
            });



        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid,{
                text:
"❌ Broadcast failed."
            });

        }

    }
};
