const fs = require("fs");
const path = require("path");

module.exports = (sock, message, text) => {
    const prefix = ".";
    if (!text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmdPath = path.join(__dirname, "..", "commands", `${command}.js`);

    if (fs.existsSync(cmdPath)) {
        require(cmdPath)(sock, message, args);
    }
};
