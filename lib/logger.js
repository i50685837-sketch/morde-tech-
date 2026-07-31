const fs = require("fs");
const path = require("path");


const logFile = path.join(
    __dirname,
    "../database/logs.json"
);



function loadLogs() {

    if (!fs.existsSync(logFile)) {

        fs.writeFileSync(
            logFile,
            JSON.stringify([], null, 2)
        );

    }


    return JSON.parse(
        fs.readFileSync(
            logFile,
            "utf-8"
        )
    );

}



function saveLogs(logs) {

    fs.writeFileSync(
        logFile,
        JSON.stringify(
            logs,
            null,
            2
        )
    );

}



function addLog(type, data) {

    const logs = loadLogs();


    logs.push({

        type,

        ...data,

        time: new Date().toISOString()

    });


    saveLogs(logs);

}



function info(message) {

    console.log(
        `ℹ️ ${message}`
    );

    addLog(
        "info",
        {
            message
        }
    );

}



function error(message) {

    console.error(
        `❌ ${message}`
    );

    addLog(
        "error",
        {
            message
        }
    );

}



function success(message) {

    console.log(
        `✅ ${message}`
    );

    addLog(
        "success",
        {
            message
        }
    );

}



module.exports = {

    addLog,
    info,
    error,
    success

};
