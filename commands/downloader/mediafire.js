module.exports = {
    name: "mediafire",
    aliases: ["mf", "mfdownload"],
    description: "Download MediaFire files",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;
        const url = args[0];

        if (!url) {
            return sock.sendMessage(jid, {
                text:
`📂 *MORDE-TECH MEDIAFIRE DOWNLOADER*

Usage:
.mediafire <MediaFire link>

Example:
.mediafire https://www.mediafire.com/file/xxxxx`
            });
        }


        try {

            await sock.sendMessage(jid, {
                text:
`⏳ *Processing MediaFire File...*

🔗 Link:
${url}

Please wait...`
            });



            /*
              Connect your MediaFire downloader API here.

              Expected response:

              {
                fileName: "example.zip",
                size: "20MB",
                download: "https://example.com/file.zip"
              }
            */


            const result = {
                fileName: "MediaFire File",
                size: "Unknown",
                download: null
            };



            if (!result.download) {

                return sock.sendMessage(jid, {
                    text:
`❌ Downloader service not connected.

Add your MediaFire API inside mediafire.js.`
                });

            }



            await sock.sendMessage(jid, {
                document: {
                    url: result.download
                },
                fileName: result.fileName,
                caption:
`📂 *MediaFire Download*

📄 Name:
${result.fileName}

📦 Size:
${result.size}

🔥 Downloaded by Morde-Tech`
            });


        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid, {
                text:
"❌ Failed to download MediaFire file."
            });

        }
    }
};
