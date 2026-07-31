async function admin(sock, msg) {

    const jid =
        msg.key.remoteJid;


    // Not a group
    if (!jid.endsWith("@g.us")) {
        return false;
    }



    const sender =
        msg.key.participant;



    try {

        const metadata =
            await sock.groupMetadata(jid);



        const isAdmin =
            metadata.participants.some(
                participant =>
                    participant.id === sender &&
                    (
                        participant.admin === "admin" ||
                        participant.admin === "superadmin"
                    )
            );



        return isAdmin;



    } catch (error) {

        console.error(
            "Admin check error:",
            error
        );

        return false;

    }

}



module.exports = admin;
