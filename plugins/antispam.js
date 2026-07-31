const spam = new Map();


const LIMIT = 8; // messages
const TIME = 5000; // 5 seconds



module.exports = {

    name: "antispam",

    description: "Blocks users sending too many messages",



    async run(sock, msg) {


        const user =
            msg.key.participant ||
            msg.key.remoteJid;



        const now =
            Date.now();



        if (!spam.has(user)) {

            spam.set(user, []);

        }



        const messages =
            spam.get(user);



        messages.push(now);



        // Remove old messages

        const recent =
            messages.filter(
                time =>
                now - time < TIME
            );



        spam.set(
            user,
            recent
        );



        if (recent.length >= LIMIT) {


            await sock.sendMessage(

                msg.key.remoteJid,

                {
                    text:
                    "⚠️ Anti-spam activated!\nPlease slow down."
                },

                {
                    quoted: msg
                }

            );



            return false;

        }



        return true;

    }

};
