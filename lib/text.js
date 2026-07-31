function removeSpaces(text) {

    return text
        .replace(/\s+/g, " ")
        .trim();

}



function capitalize(text) {

    if (!text)
        return "";

    return (
        text.charAt(0)
            .toUpperCase()
        +
        text.slice(1)
    );

}



function upperCase(text) {

    return text.toUpperCase();

}



function lowerCase(text) {

    return text.toLowerCase();

}



function reverse(text) {

    return text
        .split("")
        .reverse()
        .join("");

}



function countWords(text) {

    return text
        .trim()
        .split(/\s+/)
        .length;

}



function isEmpty(text) {

    return (
        !text ||
        text.trim().length === 0
    );

}



function replaceText(
    text,
    search,
    replace
) {

    return text.replace(
        search,
        replace
    );

}



function randomText(length = 10) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


    let result = "";


    for (
        let i = 0;
        i < length;
        i++
    ) {

        result += chars[
            Math.floor(
                Math.random() *
                chars.length
            )
        ];

    }


    return result;

}



function removeSpecial(text) {

    return text.replace(
        /[^a-zA-Z0-9 ]/g,
        ""
    );

}



module.exports = {

    removeSpaces,
    capitalize,
    upperCase,
    lowerCase,
    reverse,
    countWords,
    isEmpty,
    replaceText,
    randomText,
    removeSpecial

};
