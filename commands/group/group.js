module.exports = {
    name: "group",
    aliases: ["gmenu", "groupmenu"],
    description: "Show group commands menu",

    async execute(sock, msg) {

        const jid = msg.key.remoteJid;


        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
                text:
"❌ This menu is only available in groups."
            });
        }


        await sock.sendMessage(jid, {
            text:
`╭━━━〔 👥 MORDE-TECH GROUP MENU 〕━━━⬣

🛡️ *ADMIN TOOLS*

➤ .add
➤ .kick
➤ .promote
➤ .demote
➤ .mute
➤ .unmute
➤ .lock
➤ .unlock

━━━━━━━━━━━━━━━━━━

👥 *MEMBER TOOLS*

➤ .tagall
➤ .hidetag
➤ .groupinfo
➤ .link

━━━━━━━━━━━━━━━━━━

⚙️ *SECURITY*

➤ .antilink
➤ .warn
➤ .unwarn
➤ .welcome
➤ .goodbye

━━━━━━━━━━━━━━━━━━

🤖 Powered by:
*Morde-Tech Bot 🔥*

╰━━━━━━━━━━━━━━━━━━⬣`
        });

    }
};
