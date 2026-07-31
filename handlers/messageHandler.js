const commandHandler = require("./commandHandler");

module.exports = async (sock, msg) => {
    if (!msg.message) return;

    const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        "";

    commandHandler(sock, msg, text);
};
