const db = require("../lib/database");


async function auth(sock, msg) {

    const user =
        msg.key.participant ||
        msg.key.remoteJid;


    const users =
        db.read("users.json");



    if (!users[user]) {

        users[user] = {

            registered: true,

            joined:
            new Date()
            .toISOString(),

            messages: 0,

            commandsUsed: 0

        };


        db.write(
            "users.json",
            users
        );

    }



    users[user].messages++;


    db.write(
        "users.json",
        users
    );



    return true;

}



module.exports = auth;
