module.exports = {
    name: "instagram",
    aliases: ["ig", "igdl"],
    description: "Download Instagram media",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;
        const url = args[0];

        if (!url) {
            return sock.sendMessage(jid, {
                text:
`📸 *MORDE-TECH INSTAGRAM DOWNLOADER*

Usage:
.instagram <Instagram link>

Example:
.instagram https://instagram.com/p/xxxxx`
            });
        }


        try {

            await sock.sendMessage(jid, {
                text:
`⏳ *Processing Instagram Media...*

🔗 Link:
${url}

Please wait...`
            });



            /*
              Connect your Instagram downloader API here.

              Expected response:

              {
                type: "video",
                url: "https://example.com/media.mp4"
              }

              or

              {
                type: "image",
                url: "https://example.com/image.jpg"
              }
            */


            const result = {
                type: null,
                url: null
            };



            if (!result.url) {

                return sock.sendMessage(jid, {
                    text:
`❌ Downloader service not connected.

Add your Instagram API inside instagram.js.`
                });

            }



            if (result.type === "video") {

                await sock.sendMessage(jid, {
                    video: {
                        url: result.url
                    },
                    caption:
`📸 Instagram Video

🔥 Downloaded by Morde-Tech`
                });

            } else {

                await sock.sendMessage(jid, {
                    image: {
                        url: result.url
                    },
                    caption:
`📸 Instagram Image

🔥 Downloaded by Morde-Tech`
                });

            }


        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid, {
                text:
"❌ Failed to download Instagram media."
            });

        }
    }
};
