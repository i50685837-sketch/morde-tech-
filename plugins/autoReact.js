const reactions = [
    "🔥",
    "❤️",
    "👍",
    "😂",
    "💯",
    "✅"
];


async function autoReact(sock) {


    sock.ev.on(
        "messages.upsert",
        async ({ messages }) => {


            for (const msg of messages) {


                if (
                    !msg.message ||
                    msg.key.fromMe
                ) continue;



                const emoji =
                    reactions[
                        Math.floor(
                            Math.random() *
                            reactions.length
                        )
                    ];



                try {

                    await sock.sendMessage(
                        msg.key.remoteJid,
                        {
                            react: {
                                text: emoji,
                                key: msg.key
                            }
                        }
                    );


                } catch (error) {

                    console.log(
                        "AutoReact Error:",
                        error.message
                    );

                }


            }

        }
    );


}



module.exports = autoReact;
