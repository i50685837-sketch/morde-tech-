const axios = require("axios");


const downloader = async (sock) => {


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



                // Example: .download URL

                if (
                    !text.startsWith(".download")
                ) continue;



                const url =
                    text.split(" ")[1];



                if (!url) {

                    return sock.sendMessage(

                        msg.key.remoteJid,

                        {
                            text:
                            "❌ Provide a URL\nExample: .download https://example.com"
                        },

                        {
                            quoted: msg
                        }

                    );

                }



                try {


                    const response =
                        await axios.get(
                            url,
                            {
                                responseType:
                                "arraybuffer"
                            }
                        );



                    await sock.sendMessage(

                        msg.key.remoteJid,

                        {

                            document:
                            Buffer.from(
                                response.data
                            ),

                            mimetype:
                            "application/octet-stream",

                            fileName:
                            "downloaded_file"

                        },

                        {
                            quoted: msg
                        }

                    );



                } catch (error) {


                    await sock.sendMessage(

                        msg.key.remoteJid,

                        {
                            text:
                            "❌ Download failed."
                        },

                        {
                            quoted: msg
                        }

                    );


                }


            }


        }
    );


};



module.exports = downloader;
