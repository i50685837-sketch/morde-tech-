module.exports = {
    name: "twitter",
    aliases: ["x", "twitterdl", "xdl"],
    description: "Download Twitter/X videos",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;
        const url = args[0];

        if (!url) {
            return sock.sendMessage(jid, {
                text:
`🐦 *MORDE-TECH TWITTER/X DOWNLOADER*

Usage:
.twitter <Twitter/X link>

Example:
.twitter https://x.com/user/status/xxxxx`
            });
        }


        try {

            await sock.sendMessage(jid, {
                text:
`⏳ *Processing Twitter/X Media...*

🔗 Link:
${url}

Please wait...`
            });



            /*
              Connect your Twitter/X downloader API here.

              Expected response:

              {
                title: "Twitter Video",
                video: "https://example.com/video.mp4"
              }
            */


            const result = {
                title: "Twitter/X Video",
                video: null
            };



            if (!result.video) {

                return sock.sendMessage(jid, {
                    text:
`❌ Downloader service not connected.

Add your Twitter/X API inside twitter.js.`
                });

            }



            await sock.sendMessage(jid, {
                video: {
                    url: result.video
                },
                caption:
`🐦 *${result.title}*

🔥 Downloaded by Morde-Tech`
            });


        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid, {
                text:
"❌ Failed to download Twitter/X media."
            });

        }
    }
};
