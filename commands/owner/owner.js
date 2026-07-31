module.exports = {
    name: "owner",
    aliases: ["creator", "dev"],
    description: "Show bot owner information",
    owner: false,

    async execute(sock, msg) {

        const jid = msg.key.remoteJid;

        const ownerNumber =
            process.env.OWNER_NUMBER || "Not set";

        await sock.sendMessage(jid, {
            text:
`╭━━━〔 👑 MORDE-TECH OWNER 〕━━━⬣

🤖 Bot Name:
Morde-Tech Bot

👨‍💻 Developer:
Morde-Tech

📱 Owner:
+${ownerNumber}

⚡ Version:
1.0.0

🚀 Features:
• AI System
• Downloader
• Economy
• Group Tools
• Admin Panel
• 100+ Commands

━━━━━━━━━━━━━━━━━━

💻 Built with:
Node.js + Baileys

🔥 Morde-Tech Bot

╰━━━━━━━━━━━━━━━━━━⬣`
        });

    }
};
