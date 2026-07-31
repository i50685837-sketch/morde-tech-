function formatMoney(amount, currency = "KES") {

    return `${currency} ${Number(amount).toLocaleString()}`;

}



function formatNumber(number) {

    return Number(number)
        .toLocaleString();

}



function formatDate(date = new Date()) {

    return new Date(date)
        .toLocaleDateString(
            "en-GB"
        );

}



function formatTime(date = new Date()) {

    return new Date(date)
        .toLocaleTimeString(
            "en-GB"
        );

}



function formatDuration(seconds) {

    const hours =
        Math.floor(seconds / 3600);


    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );


    const secs =
        seconds % 60;


    return `${hours}h ${minutes}m ${secs}s`;

}



function formatBytes(bytes) {

    if (!bytes)
        return "0 Bytes";


    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return `${(
        bytes /
        Math.pow(1024, index)
    ).toFixed(2)} ${units[index]}`;

}



function shorten(text, length = 20) {

    if (text.length <= length)
        return text;


    return text.substring(
        0,
        length
    ) + "...";

}



function progressBar(
    current,
    total,
    size = 10
) {

    const progress =
        Math.round(
            (current / total) * size
        );


    return (
        "█".repeat(progress) +
        "░".repeat(size - progress)
    );

}



module.exports = {

    formatMoney,
    formatNumber,
    formatDate,
    formatTime,
    formatDuration,
    formatBytes,
    shorten,
    progressBar

};
