const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");


const tempFolder = path.join(
    __dirname,
    "../temp"
);



if (!fs.existsSync(tempFolder)) {

    fs.mkdirSync(tempFolder);

}



// Convert video to audio
function videoToAudio(input, output) {

    return new Promise((resolve, reject) => {

        ffmpeg(input)

            .toFormat("mp3")

            .on("end", () => {

                resolve(output);

            })

            .on("error", (err) => {

                reject(err);

            })

            .save(output);

    });

}



// Convert audio format
function convertAudio(
    input,
    output,
    format = "mp3"
) {

    return new Promise((resolve, reject) => {

        ffmpeg(input)

            .toFormat(format)

            .on("end", () => {

                resolve(output);

            })

            .on("error", reject)

            .save(output);

    });

}



// Convert video format
function convertVideo(
    input,
    output,
    format = "mp4"
) {

    return new Promise((resolve, reject) => {

        ffmpeg(input)

            .toFormat(format)

            .on("end", () => {

                resolve(output);

            })

            .on("error", reject)

            .save(output);

    });

}



// Get file extension
function getExtension(filename) {

    return path.extname(filename);

}



// Delete temporary file
function removeFile(file) {

    if (fs.existsSync(file)) {

        fs.unlinkSync(file);

    }

}



module.exports = {

    videoToAudio,
    convertAudio,
    convertVideo,
    getExtension,
    removeFile

};
