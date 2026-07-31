const users = new Map();


const LIMIT = 10; // commands allowed
const TIME = 60000; // 1 minute



function rateLimits(sock, msg) {

    const user =
        msg.key.participant ||
        msg.key.remoteJid;



    const now =
        Date.now();



    if (!users.has(user)) {

        users.set(user, {

            count: 1,

            time: now

        });


        return false;

    }



    const data =
        users.get(user);



    // Reset after time
    if (now - data.time > TIME) {

        users.set(user, {

            count: 1,

            time: now

        });


        return false;

    }



    data.count++;



    users.set(
        user,
        data
    );



    // Limit reached
    if (data.count > LIMIT) {

        return true;

    }



    return false;

}



module.exports = rateLimits;
