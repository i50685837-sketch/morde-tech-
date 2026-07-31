module.exports = {
    name: "groupinfo",
    aliases: ["ginfo", "info"],
    description: "Show group information",

    async execute(sock, msg) {

        const jid = msg.key.remoteJid;


        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
                text:
"❌ This command only works in groups."
            });
        }



        try {

            const metadata =
                await sock.groupMetadata(jid);



            const admins =
                metadata.participants.filter(
                    member =>
                    member.admin === "admin" ||
                    member.admin === "superadmin"
                );



            const created =
                new Date(
                    metadata.creation * 1000
                ).toLocaleDateString();



            await sock.sendMessage(jid, {

                text:
`╭━━━〔 👥 GROUP INFO 〕━━━⬣

📌 Name:
${metadata.subject}

🆔 ID:
${metadata.id}

👥 Members:
${metadata.participants.length}

🛡️ Admins:
${admins.length}

📅 Created:
${created}

📝 Description:
${metadata.desc || "No description"}

🤖 Bot:
Morde-Tech Bot 🔥

╰━━━━━━━━━━━━━━━━━━⬣`

            });


        } catch(error) {

            console.error(error);


            await sock.sendMessage(jid,{
                text:
"❌ Failed to fetch group information."
            });

        }

    }
};
