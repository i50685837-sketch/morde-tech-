module.exports = {
    name: "imagine",
    description: "Generate images",

    async execute(sock, msg, args) {
        const prompt = args.join(" ");

        if (!prompt) {
            return sock.sendMessage(msg.key.remoteJid, {
                text: "Example:\n.imagine futuristic city"
            });
        }

        await sock.sendMessage(msg.key.remoteJid, {
            text: `🎨 Image generation requested for:\n${prompt}\n\n(Connect your preferred image-generation service here.)`
        });
    }
};
