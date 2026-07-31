const axios = require("axios");
const fs = require("fs");
const path = require("path");


const tempFolder = path.join(
    __dirname,
    "../temp"
);



if (!fs.existsSync(tempFolder)) {

    fs.mkdirSync(tempFolder);

}



// Download file from URL
async function download(url, filename) {

    try {

        const filePath =
            path.join(
                tempFolder,
                filename
            );


        const response =
            await axios({
                method: "GET",
                url,
                responseType: "stream"
            });



        const writer =
            fs.createWriteStream(
                filePath
            );


        response.data.pipe(writer);



        return new Promise(
            (resolve, reject) => {

                writer.on(
                    "finish",
                    () => resolve(filePath)
                );


                writer.on(
                    "error",
                    reject
                );

            }
        );


    } catch (error) {

        throw new Error(
            "Download failed: " +
            error.message
        );

    }

}



// Download buffer
async function getBuffer(url) {

    const response =
        await axios.get(
            url,
            {
                responseType: "arraybuffer"
            }
        );


    return Buffer.from(
        response.data
    );

}



module.exports = {

    download,
    getBuffer

};
