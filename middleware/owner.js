const config =
require("../lib/config");


function owner(sock, msg) {


    const sender =
        msg.key.participant ||
        msg.key.remoteJid;



    return config.owner.includes(
        sender
    );


}



module.exports = owner;
