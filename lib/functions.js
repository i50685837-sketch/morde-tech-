const moment = require("moment");


// Format WhatsApp number
function formatNumber(number) {

    return number
        .replace(/[^0-9]/g, "")
        + "@s.whatsapp.net";

}



// Check if URL exists in text
function isUrl(text) {

    return /https?:\/\/|www\./i.test(text);

}



// Get current date
function getDate() {

    return moment()
        .format("YYYY-MM-DD");

}



// Get current time
function getTime() {

    return moment()
        .format("HH:mm:ss");

}



// Delay function
function sleep(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}



// Random item from array
function random(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}



// Capitalize text
function capitalize(text) {

    return text
        .charAt(0)
        .toUpperCase()
        + text.slice(1);

}



// Convert bytes to readable size
function formatBytes(bytes) {

    if (bytes === 0)
        return "0 Bytes";


    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const i =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        Math.round(
            bytes /
            Math.pow(1024, i)
        )
        + " "
        + sizes[i]
    );

}



// Generate random ID
function randomID(length = 8) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


    let id = "";


    for (
        let i = 0;
        i < length;
        i++
    ) {

        id += chars[
            Math.floor(
                Math.random() *
                chars.length
            )
        ];

    }


    return id;

}



module.exports = {

    formatNumber,
    isUrl,
    getDate,
    getTime,
    sleep,
    random,
    capitalize,
    formatBytes,
    randomID

};
