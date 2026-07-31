const fs = require("fs");
const path = require("path");

module.exports = (sock) => {
    const pluginFolder = path.join(__dirname, "..", "plugins");

    if (!fs.existsSync(pluginFolder)) return;

    fs.readdirSync(pluginFolder).forEach(file => {
        if (file.endsWith(".js")) {
            require(path.join(pluginFolder, file))(sock);
        }
    });
};
