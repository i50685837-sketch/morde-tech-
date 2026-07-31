let scannerStream;


async function startQRScanner() {

    const video =
        document.getElementById("camera");


    try {

        scannerStream =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: "environment"
                }

            });


        video.srcObject =
            scannerStream;


    } catch (error) {

        console.log(
            "Camera error:",
            error.message
        );


        alert(
            "Camera permission required"
        );

    }

}



function stopQRScanner() {

    if (scannerStream) {

        scannerStream
        .getTracks()
        .forEach(
            track => track.stop()
        );

    }

}



startQRScanner();
