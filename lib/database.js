const fs = require("fs");
const path = require("path");


const databasePath = path.join(
    __dirname,
    "../database"
);



function getFile(file) {

    return path.join(
        databasePath,
        file
    );

}



function createFile(file, defaultData = {}) {

    const filePath = getFile(file);


    if (!fs.existsSync(filePath)) {

        fs.writeFileSync(
            filePath,
            JSON.stringify(defaultData, null, 2)
        );

    }

}



function read(file) {

    createFile(file);


    try {

        return JSON.parse(
            fs.readFileSync(
                getFile(file),
                "utf-8"
            )
        );

    } catch (error) {

        return {};

    }

}



function write(file, data) {

    fs.writeFileSync(
        getFile(file),
        JSON.stringify(
            data,
            null,
            2
        )
    );

}



function update(file, key, value) {

    const data = read(file);

    data[key] = value;

    write(file, data);

}



function remove(file, key) {

    const data = read(file);

    delete data[key];

    write(file, data);

}



module.exports = {

    read,
    write,
    update,
    remove,
    createFile

};
