module.exports = {
    name: "facebook",
    aliases: ["fb", "fbdl"],
    description: "Download Facebook videos",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;
        const url = args[0];

        if (!url) {
            return sock.sendMessage(jid, {
                text:
`📘 *MORDE-TECH FACEBOOK DOWNLOADER*

Usage:
.facebook <Facebook video link>

Example:
.facebook https://facebook.com/watch/?v=xxxxx`
            });
        }


        try {

            await sock.sendMessage(jid, {
                text:
`⏳ *Processing Facebook Video...*

🔗 Link:
${url}

Please wait...`
            });



            /*
              Connect your Facebook downloader API here.

              Expected response:

              {
                title: "Facebook Video",
                video: "https://example.com/video.mp4"
              }
            */


            const result = {
                title: "Facebook Video",
                video: null
            };



            if (!result.video) {

                return sock.sendMessage(jid, {
                    text:
`❌ Downloader service not connected.

Add your Facebook API inside facebook.js.`
                });

            }



            await sock.sendMessage(jid, {
                video: {
                    url: result.video
                },
                caption:
`📘 *${result.title}*

🔥 Downloaded by Morde-Tech`
            });


        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid, {
                text:
"❌ Failed to download Facebook video."
            });

        }
    }
};
