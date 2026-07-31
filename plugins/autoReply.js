const replies = {

    "hi": "👋 Hello! How can I help you?",

    "hello": "🔥 Hello there! Welcome to Morde-Tech Bot.",

    "bot": "🤖 Yes, I am online.",

    "owner": "👑 Contact my owner for assistance.",

    "menu": "📌 Type .menu to see available commands.",

    "thanks": "😊 You're welcome!"

};



async function autoReply(sock) {


    sock.ev.on(
        "messages.upsert",
        async ({ messages }) => {


            for (const msg of messages) {


                if (
                    !msg.message ||
                    msg.key.fromMe
                ) continue;



                const text =
                    msg.message
                    ?.conversation
                    ?.toLowerCase()
                    ||
                    msg.message
                    ?.extendedTextMessage
                    ?.text
                    ?.toLowerCase();



                if (!text) continue;



                if (replies[text]) {


                    await sock.sendMessage(

                        msg.key.remoteJid,

                        {
                            text:
                            replies[text]
                        },

                        {
                            quoted: msg
                        }

                    );


                }


            }

        }
    );


}



module.exports = autoReply;
