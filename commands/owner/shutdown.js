module.exports = {
    name: "shutdown",
    aliases: ["stop", "off"],
    description: "Shutdown Morde-Tech bot",
    owner: true,

    async execute(sock, msg) {

        const jid = msg.key.remoteJid;


        try {

            await sock.sendMessage(jid, {
                text:
`🛑 *MORDE-TECH SHUTDOWN*

Bot is going offline...

👋 See you soon.`
            });


            setTimeout(async () => {

                try {

                    await sock.logout();

                } catch (err) {

                    console.log(
                        "Logout error:",
                        err.message
                    );

                }


                process.exit(0);


            }, 3000);



        } catch (error) {

            console.error(error);

            process.exit(1);

        }

    }
};
