const axios = require("axios");

module.exports = {
    name: "ytmp3",
    aliases: ["yta", "ytaudio"],
    description: "Download YouTube audio",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;
        const url = args[0];

        if (!url) {
            return sock.sendMessage(jid, {
                text:
`🎵 *MORDE-TECH YTMP3*

Usage:
.ytmp3 <YouTube link>

Example:
.ytmp3 https://youtube.com/watch?v=xxxxx`
            });
        }


        try {

            await sock.sendMessage(jid,{
                text:
`⏳ Downloading audio...

🔗 Link:
${url}`
            });


            /*
              Connect your downloader API here.

              Example response expected:

              {
                title:"Song Name",
                audio:"https://example.com/audio.mp3"
              }
            */


            const result = {
                title: "YouTube Audio",
                audio: null
            };


            if (!result.audio) {

                return sock.sendMessage(jid,{
                    text:
`❌ Downloader service not connected.

Add your YouTube audio API inside ytmp3.js.`
                });

            }



            await sock.sendMessage(jid,{
                audio:{
                    url: result.audio
                },
                mimetype:"audio/mpeg",
                fileName:`${result.title}.mp3`
            });


        } catch(error){

            console.error(error);

            await sock.sendMessage(jid,{
                text:
"❌ Failed to download YouTube audio."
            });

        }
    }
};
