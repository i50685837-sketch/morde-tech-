module.exports = {
    name: "restart",
    aliases: ["reboot"],
    description: "Restart Morde-Tech bot",
    owner: true,

    async execute(sock, msg) {

        const jid = msg.key.remoteJid;


        try {

            await sock.sendMessage(jid, {
                text:
`♻️ *MORDE-TECH RESTART*

Bot is restarting...

⏳ Please wait a few seconds.`
            });


            setTimeout(() => {

                process.exit(0);

            }, 2000);



        } catch (error) {

            console.error(error);


            process.exit(1);

        }

    }
};
