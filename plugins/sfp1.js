const fs = require("fs");
const { cmd } = require("../command");

cmd({
    pattern: "sfp",
    alias: [],
    react: "💾",
    desc: "Save replied text as a plugin file",
    category: "tools",
    use: ".sfp <filename>",
    filename: __filename
}, async (conn, mek, m, { from, reply, q, args }) => {
    try {
        const filename = q || args.join(" ");

        if (!filename) {
            return reply(
                "❌ Please provide a filename.\n\nExample:\n.sfp menu"
            );
        }

        if (!m.quoted?.text) {
            return reply(
                "❌ Please reply to the message containing the code."
            );
        }

        const filePath = `plugins/${filename}.js`;

        fs.writeFileSync(filePath, m.quoted.text);

        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: m.key
            }
        });

        return reply(`✅ Saved successfully:\n${filePath}`);

    } catch (error) {
        console.error("SFP Error:", error);

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: m.key
            }
        });

        return reply(`❌ Failed to save file:\n${error.message}`);
    }
});