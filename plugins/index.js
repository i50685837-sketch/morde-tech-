const antiDelete =
require("./antiDelete");

const autoRead =
require("./autoRead");

const autoReact =
require("./autoReact");

const autoReply =
require("./autoReply");

const chatbot =
require("./chatbot");

const downloader =
require("./downloader");



function load(sock) {


    console.log(
        "🔌 Loading plugins..."
    );



    antiDelete(sock);

    autoRead(sock);

    autoReact(sock);

    autoReply(sock);

    chatbot(sock);

    downloader(sock);



    console.log(
        "✅ Plugins loaded successfully"
    );

}



module.exports = {

    load

};
