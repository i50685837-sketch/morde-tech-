module.exports = {
    name: "tagall",
    aliases: ["everyone", "all"],
    description: "Mention all group members",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;


        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
                text:
"❌ This command only works in groups."
            });
        }



        const metadata =
            await sock.groupMetadata(jid);



        const members =
            metadata.participants.map(
                member => member.id
            );



        const message =
            args.join(" ") ||
            "Attention everyone 📢";



        let text =
`📢 *MORDE-TECH TAG ALL*

${message}

━━━━━━━━━━━━━━
`;



        for (const member of members) {

            text += `@${member.split("@")[0]}\n`;

        }



        await sock.sendMessage(jid, {
            text,
            mentions: members
        });


    }
};
