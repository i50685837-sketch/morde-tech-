async function autoRead(sock) {


    sock.ev.on(
        "messages.upsert",
        async ({ messages }) => {


            for (const msg of messages) {


                if (!msg.key.fromMe) {


                    await sock.readMessages([
                        msg.key
                    ]);


                }


            }


        }
    );


}



module.exports = autoRead;
