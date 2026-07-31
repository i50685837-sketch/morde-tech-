const db = require("../lib/database");


function banned(sock, msg) {


    const user =
        msg.key.participant ||
        msg.key.remoteJid;



    const bans =
        db.read("bans.json");



    return bans.includes(user);


}



module.exports = banned;
