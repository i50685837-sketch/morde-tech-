function serialize(sock, msg) {

    if (!msg) return msg;


    msg.id =
        msg.key.id;


    msg.chat =
        msg.key.remoteJid;


    msg.isGroup =
        msg.chat.endsWith("@g.us");


    msg.sender =
        msg.isGroup
            ? msg.key.participant
            : msg.key.remoteJid;



    msg.fromMe =
        msg.key.fromMe;



    msg.text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.imageMessage?.caption ||
        msg.message?.videoMessage?.caption ||
        "";



    msg.type =
        Object.keys(
            msg.message || {}
        )[0];



    msg.reply = (text) => {

        return sock.sendMessage(
            msg.chat,
            {
                text
            },
            {
                quoted: msg
            }
        );

    };



    msg.react = (emoji) => {

        return sock.sendMessage(
            msg.chat,
            {
                react: {
                    text: emoji,
                    key: msg.key
                }
            }
        );

    };



    msg.download = async () => {

        const {
            downloadContentFromMessage
        } = require("@whiskeysockets/baileys");


        const type =
            msg.type
                .replace("Message", "");



        const stream =
            await downloadContentFromMessage(
                msg.message[msg.type],
                type
            );


        let buffer =
            Buffer.from([]);


        for await (const chunk of stream) {

            buffer =
                Buffer.concat([
                    buffer,
                    chunk
                ]);

        }


        return buffer;

    };


    return msg;

}



module.exports = serialize;
