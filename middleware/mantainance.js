const db = require("../lib/database");
const config = require("../lib/config");


function maintenance(sock, msg) {


    const sender =
        msg.key.participant ||
        msg.key.remoteJid;



    // Owner can always use bot
    if (config.owner.includes(sender)) {

        return false;

    }



    const settings =
        db.read("settings.json");



    return settings.maintenance === true;


}



module.exports = maintenance;
