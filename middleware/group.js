function group(sock, msg) {

    const jid =
        msg.key.remoteJid;


    return jid.endsWith("@g.us");

}



module.exports = group;
