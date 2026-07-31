const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;

let sock;



// Serve website

app.use(
    express.static(
        "public"
    )
);



// Pairing endpoint

app.get(
    "/pair",
    async (req, res) => {

        try {

            const number =
            req.query.number;


            if (!number) {

                return res.json({
                    error:
                    "Number required"
                });

            }


            const code =
            await sock.requestPairingCode(
                number
            );


            res.json({

                code

            });


        } catch(error) {

            res.json({

                error:
                error.message

            });

        }

    }
);





async function startBot(){


const { state, saveCreds } =
await useMultiFileAuthState(
    "./session"
);



sock =
makeWASocket({

    auth: state,

    printQRInTerminal: true

});



// Save session

sock.ev.on(
"creds.update",
saveCreds
);




// Connection updates

sock.ev.on(
"connection.update",
(update)=>{


const {
connection,
qr
} = update;



if(qr){

console.log(
"📱 QR Generated"
);

}



if(connection === "open"){

console.log(
"✅ WhatsApp Connected"
);

}



if(connection === "close"){

const reason =
update.lastDisconnect
?.error
?.output
?.statusCode;



if(reason !== DisconnectReason.loggedOut){

startBot();

}

}


});



}



app.listen(
PORT,
()=>{

console.log(
`🌐 Website running: http://localhost:${PORT}`
);

}
);



startBot();
