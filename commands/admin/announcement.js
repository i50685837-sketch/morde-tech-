module.exports = {
    name: "announcement",
    aliases: ["announce", "groupbc"],
    description: "Send an announcement to all groups",
    owner: true,

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const text = args.join(" ");

        if (!text) {
            return await sock.sendMessage(jid, {
                text: `📢 *Morde-Tech Announcement*

Usage:
.announcement <message>

Example:
.announcement The bot has been updated to v2.0 🚀`
            });
        }

        try {
            const groups = await sock.groupFetchAllParticipating();
            const groupIds = Object.keys(groups);

            let sent = 0;
            let failed = 0;

            for (const groupId of groupIds) {
                try {
                    await sock.sendMessage(groupId, {
                        text: `╭━━━〔 📢 MORDE-TECH ANNOUNCEMENT 〕━━━⬣

${text}

━━━━━━━━━━━━━━━━━━
🤖 Powered by Morde-Tech`
                    });

                    sent++;

                    // Delay to avoid sending too quickly
                    await new Promise(resolve => setTimeout(resolve, 1500));

                } catch (err) {
                    failed++;
                }
            }

            await sock.sendMessage(jid, {
                text: `✅ *Announcement Complete*

📢 Groups Reached: ${sent}
❌ Failed: ${failed}
📂 Total Groups: ${groupIds.length}`
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Failed to send the announcement."
            });
        }
    }
};
