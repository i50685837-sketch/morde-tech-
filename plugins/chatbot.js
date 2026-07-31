const config = require("../lib/config");
const axios = require("axios");



async function chatbot(sock) {


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
                    ||
                    msg.message
                    ?.extendedTextMessage
                    ?.text;



                if (!text) continue;



                // Only reply when user mentions bot

                if (
                    !text.toLowerCase()
                    .includes("bot")
                ) return;



                try {


                    const response =
                        await axios.post(

                            "https://api.openai.com/v1/chat/completions",

                            {

                                model:
                                "gpt-4o-mini",

                                messages: [

                                    {

                                        role:
                                        "user",

                                        content:
                                        text

                                    }

                                ]

                            },

                            {

                                headers: {

                                    Authorization:
                                    `Bearer ${config.api.openai}`,

                                    "Content-Type":
                                    "application/json"

                                }

                            }

                        );



                    const reply =
                        response.data
                        .choices[0]
                        .message
                        .content;



                    await sock.sendMessage(

                        msg.key.remoteJid,

                        {
                            text: reply
                        },

                        {
                            quoted: msg
                        }

                    );



                } catch (error) {


                    console.log(
                        "Chatbot Error:",
                        error.message
                    );


                }


            }


        }
    );


}



module.exports = chatbot;
