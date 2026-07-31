const axios = require("axios");


// GET request
async function get(url, params = {}) {

    try {

        const response =
            await axios.get(
                url,
                {
                    params
                }
            );

        return response.data;


    } catch (error) {

        throw new Error(
            "API GET failed: " +
            error.message
        );

    }

}



// POST request
async function post(
    url,
    data = {}
) {

    try {

        const response =
            await axios.post(
                url,
                data
            );


        return response.data;


    } catch (error) {

        throw new Error(
            "API POST failed: " +
            error.message
        );

    }

}



// Download data as buffer
async function buffer(url) {

    try {

        const response =
            await axios.get(
                url,
                {
                    responseType:
                    "arraybuffer"
                }
            );


        return Buffer.from(
            response.data
        );


    } catch (error) {

        throw new Error(
            "Buffer download failed: " +
            error.message
        );

    }

}



// Check API status
async function check(url) {

    try {

        await axios.get(url);

        return true;


    } catch {

        return false;

    }

}



module.exports = {

    get,
    post,
    buffer,
    check

};
