const fs = require("fs");
const path = require("path");


const deletedFile =
    path.join(
        __dirname,
        "../database/deleted.json"
    );



function saveDeleted(data) {

    if (!fs.existsSync(deletedFile)) {

        fs.writeFileSync(
            deletedFile,
            JSON.stringify([], null, 2)
        );

    }


    const messages =
        JSON.parse(
            fs.readFileSync(
                deletedFile,
                "utf-8"
            )
        );


    messages.push(data);


    fs.writeFileSync(
        deletedFile,
        JSON.stringify(
            messages,
            null,
            2
        )
    );

}



async function antiDelete(sock) {


    sock.ev.on(
        "messages.update",
        async (updates) => {


            for (const update of updates) {


                if (
                    update.update.messageStubType
                    ===  REVOKE
                ) {

                    const msg =
                        update.key;



                    saveDeleted({

                        chat:
                        msg.remoteJid,

                        sender:
                        msg.participant,

                        id:
                        msg.id,

                        time:
                        new Date()
                        .toISOString()

                    });


                }

            }


        }
    );


}



module.exports = antiDelete;
