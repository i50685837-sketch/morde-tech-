module.exports = {
    name: "tiktok",
    aliases: ["tt", "ttdl"],
    description: "Download TikTok videos",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;
        const url = args[0];

        if (!url) {
            return sock.sendMessage(jid, {
                text:
`🎵 *MORDE-TECH TIKTOK DOWNLOADER*

Usage:
.tiktok <TikTok link>

Example:
.tiktok https://www.tiktok.com/@user/video/xxxxx`
            });
        }


        try {

            await sock.sendMessage(jid, {
                text:
`⏳ *Processing TikTok Video...*

🔗 Link:
${url}

Please wait...`
            });



            /*
              Connect your TikTok downloader API here.

              Expected response:

              {
                title: "TikTok video",
                video: "https://example.com/video.mp4"
              }
            */


            const result = {
                title: "TikTok Video",
                video: null
            };



            if (!result.video) {

                return sock.sendMessage(jid, {
                    text:
`❌ Downloader service not connected.

Add your TikTok API inside tiktok.js.`
                });

            }



            await sock.sendMessage(jid, {
                video: {
                    url: result.video
                },
                caption:
`🎵 *${result.title}*

🔥 Downloaded by Morde-Tech`
            });


        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid, {
                text:
"❌ Failed to download TikTok video."
            });

        }
    }
};
