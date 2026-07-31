module.exports = {
    name: "groups",
    aliases: ["grouplist", "allgroups"],
    description: "List all groups the bot has joined",
    owner: true,

    async execute(sock, msg) {
        const jid = msg.key.remoteJid;

        try {
            const groups = await sock.groupFetchAllParticipating();
            const groupList = Object.values(groups);

            if (!groupList.length) {
                return await sock.sendMessage(jid, {
                    text: "📂 The bot hasn't joined any groups yet."
                });
            }

            let text = `👥 *Morde-Tech Group List*\n\n`;
            text += `📊 Total Groups: ${groupList.length}\n\n`;

            groupList.forEach((group, index) => {
                text += `${index + 1}. ${group.subject}\n`;
                text += `🆔 ${group.id}\n`;
                text += `👤 Members: ${group.participants.length}\n\n`;
            });

            await sock.sendMessage(jid, {
                text
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Failed to retrieve the group list."
            });
        }
    }
};
