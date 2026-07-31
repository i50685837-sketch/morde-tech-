module.exports = {
    name: "math",
    aliases: ["solve", "calc"],
    description: "Solve mathematical expressions",

    async execute(sock, msg, args) {
        const jid = msg.key.remoteJid;
        const expression = args.join(" ");

        if (!expression) {
            return await sock.sendMessage(jid, {
                text: `🧮 *Morde-Tech Math Solver*

Usage:
.math <expression>

Examples:
.math 25 + 75
.math (15 * 8) / 4
.math 2 ** 10
.math sqrt(144)`
            });
        }

        try {
            let result;

            // Support sqrt()
            const exp = expression.replace(
                /sqrt\((.*?)\)/gi,
                (_, value) => Math.sqrt(Number(value))
            );

            // Basic evaluation
            result = Function(`"use strict"; return (${exp})`)();

            await sock.sendMessage(jid, {
                text: `🧮 *Math Solver*

📥 Expression:
${expression}

✅ Answer:
${result}`
            });

        } catch (err) {
            console.error(err);

            await sock.sendMessage(jid, {
                text: "❌ Invalid mathematical expression."
            });
        }
    }
};
