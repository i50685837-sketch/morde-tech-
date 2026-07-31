const config = require("./config");


// Check if user is bot owner
function isOwner(user) {

    return config.owner.includes(user);

}



// Check if user is group admin
async function isAdmin(sock, jid, user) {

    try {

        const metadata =
            await sock.groupMetadata(jid);


        return metadata.participants.some(
            participant =>
                participant.id === user &&
                (
                    participant.admin === "admin" ||
                    participant.admin === "superadmin"
                )
        );


    } catch (error) {

        return false;

    }

}



// Check if bot is admin
async function isBotAdmin(sock, jid) {

    try {

        const metadata =
            await sock.groupMetadata(jid);


        const bot =
            sock.user.id.split(":")[0]
            + "@s.whatsapp.net";


        return metadata.participants.some(
            participant =>
                participant.id === bot &&
                (
                    participant.admin === "admin" ||
                    participant.admin === "superadmin"
                )
        );


    } catch (error) {

        return false;

    }

}



// Check permissions
async function canUse(
    sock,
    msg,
    options = {}
) {

    const sender =
        msg.key.participant ||
        msg.key.remoteJid;


    const jid =
        msg.key.remoteJid;



    if (options.owner) {

        return isOwner(sender);

    }



    if (options.admin) {

        return await isAdmin(
            sock,
            jid,
            sender
        );

    }



    return true;

}



module.exports = {

    isOwner,
    isAdmin,
    isBotAdmin,
    canUse

};
