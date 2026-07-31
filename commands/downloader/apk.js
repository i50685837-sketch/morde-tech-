module.exports = {
    name: "apk",
    aliases: ["apkdl", "appdownload"],
    description: "Download APK files",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;
        const url = args[0];

        if (!url) {
            return sock.sendMessage(jid, {
                text:
`📱 *MORDE-TECH APK DOWNLOADER*

Usage:
.apk <APK link>

Example:
.apk https://example.com/app.apk`
            });
        }


        try {

            await sock.sendMessage(jid, {
                text:
`⏳ *Processing APK File...*

🔗 Link:
${url}

Please wait...`
            });



            /*
              Connect your APK download API here.

              Expected response:

              {
                name: "Application.apk",
                size: "50MB",
                download: "https://example.com/app.apk"
              }
            */


            const result = {
                name: "Application.apk",
                size: "Unknown",
                download: null
            };



            if (!result.download) {

                return sock.sendMessage(jid, {
                    text:
`❌ APK service not connected.

Add your APK API inside apk.js.`
                });

            }



            await sock.sendMessage(jid, {
                document: {
                    url: result.download
                },
                fileName: result.name,
                mimetype: "application/vnd.android.package-archive",
                caption:
`📱 *APK Download Complete*

📦 Name:
${result.name}

💾 Size:
${result.size}

🔥 Powered by Morde-Tech`
            });


        } catch (error) {

            console.error(error);

            await sock.sendMessage(jid, {
                text:
"❌ Failed to download APK."
            });

        }
    }
};
