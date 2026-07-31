module.exports = {
    name: "ytmp4",
    aliases: ["ytv", "ytvideo"],
    description: "Download YouTube video",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;
        const url = args[0];

        if (!url) {
            return sock.sendMessage(jid, {
                text:
`🎬 *MORDE-TECH YTMP4*

Usage:
.ytmp4 <YouTube link>

Example:
.ytmp4 https://youtube.com/watch?v=xxxxx`
            });
        }

        try {

            await sock.sendMessage(jid, {
                text:
`⏳ *Downloading Video...*

🔗 Link:
${url}

Please wait...`
            });


            /*
              Connect your YouTube video API here.

              Expected response:

              {
                title: "Video title",
                video: "https://example.com/video.mp4"
              }
            */


            const result = {
                title: "YouTube Video",
                video: null
            };


            if (!result.video) {

                return sock.sendMessage(jid, {
                    text:
`❌ Downloader service not connected.

Add your YouTube video API inside ytmp4.js.`
                });

            }



            await sock.sendMessage(jid, {
                video: {
                    url: result.video
                },
                caption:
`🎬 *${result.title}*

🔥 Downloaded by Morde-Tech`
            });


        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid, {
                text:
"❌ Failed to download YouTube video."
            });

        }
    }
};
