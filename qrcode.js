const qrcode = require("qrcode-terminal");


function showQR(qr) {

    console.log(
        "\n📱 Scan this QR Code with WhatsApp:\n"
    );


    qrcode.generate(
        qr,
        {
            small: true
        }
    );

}



module.exports = showQR;
