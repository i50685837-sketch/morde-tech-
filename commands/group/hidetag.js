module.exports = {
    name: "hidetag",
    aliases: ["htag", "hidden"],
    description: "Send hidden mention message",

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
            "Attention group members 📢";



        await sock.sendMessage(jid, {

            text: message,

            mentions: members

        });


    }
};
