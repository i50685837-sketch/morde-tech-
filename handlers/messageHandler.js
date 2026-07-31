const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "../database/settings.json");
const bannedPath = path.join(__dirname, "../database/banned.json");
const mutedPath = path.join(__dirname, "../database/muted.json");

const commands = new Map();


// Load commands
function loadCommands() {
    const commandFolders = [
        "../commands/admin",
        "../commands/ai",
        "../commands"
    ];

    for (const folder of commandFolders) {
        const folderPath = path.join(__dirname, folder);

        if (!fs.existsSync(folderPath)) continue;

        const files = fs.readdirSync(folderPath)
            .filter(file => file.endsWith(".js"));

        for (const file of files) {
            const command = require(path.join(folderPath, file));

            if (command.name) {
                commands.set(command.name, command);

                if (command.aliases) {
                    command.aliases.forEach(alias =>
                        commands.set(alias, command)
                    );
                }
            }
        }
    }

    console.log(`✅ Loaded ${commands.size} commands`);
}

loadCommands();



function readJSON(file, fallback) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(
            file,
            JSON.stringify(fallback, null, 2)
        );
    }

    return JSON.parse(
        fs.readFileSync(file)
    );
}



module.exports = async (sock, msg) => {

    try {

        if (!msg.message) return;


        const jid = msg.key.remoteJid;

        const sender =
            msg.key.participant ||
            msg.key.remoteJid;


        const owner =
            process.env.OWNER_NUMBER +
            "@s.whatsapp.net";


        const isOwner =
            sender === owner;


        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";


        const settings =
            readJSON(settingsPath, {
                prefix: ".",
                mode: "public",
                maintenance: false
            });


        const banned =
            readJSON(bannedPath, []);


        const muted =
            readJSON(mutedPath, []);



        // Auto read
        if (settings.autoRead) {
            await sock.readMessages([
                msg.key
            ]);
        }



        // Ignore banned users
        if (
            banned.includes(sender)
            &&
            !isOwner
        ) {
            return;
        }



        // Ignore muted users
        if (
            muted.includes(sender)
            &&
            !isOwner
        ) {
            return;
        }




        // Maintenance mode
        if (
            settings.maintenance
            &&
            !isOwner
        ) {

            return sock.sendMessage(jid,{
                text:
                "🛠️ Morde-Tech is under maintenance."
            });

        }




        // Bot modes

        const isGroup =
            jid.endsWith("@g.us");


        if (
            settings.mode === "owner"
            &&
            !isOwner
        ) return;



        if (
            settings.mode === "group"
            &&
            !isGroup
        ) return;



        if (
            settings.mode === "private"
            &&
            isGroup
        ) return;





        const prefix =
            settings.prefix || ".";



        if (!text.startsWith(prefix))
            return;



        const args =
            text
            .slice(prefix.length)
            .trim()
            .split(/\s+/);



        const commandName =
            args.shift()
            .toLowerCase();



        const command =
            commands.get(commandName);



        if (!command) return;




        // Owner commands
        if (
            command.owner
            &&
            !isOwner
        ) {

            return sock.sendMessage(jid,{
                text:
                "👑 This command is only for the owner."
            });

        }




        // Typing simulation
        if(settings.autoTyping){

            await sock.sendPresenceUpdate(
                "composing",
                jid
            );

        }




        await command.execute(
            sock,
            msg,
            args
        );



    } catch(error){

        console.error(
            "Message Handler Error:",
            error
        );

    }

};
