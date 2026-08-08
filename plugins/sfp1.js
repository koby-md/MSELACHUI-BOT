const fs = require("fs");
const { cmd } = require("../command");

cmd({
    pattern: "sfp",
    alias: [],
    react: "💾",
    desc: "Save replied text as a plugin file",
    category: "owner",
    use: ".sfp <filename>",
    filename: __filename
}, async (conn, mek, m, { from, reply, q, args }) => {
    try {
        const text = q || args.join(" ");

        if (!text) {
            return reply(
                `❌ Please provide a filename.\n\nExample:\n.sfp menu`
            );
        }

        if (!m.quoted?.text) {
            return reply(
                `❌ Please reply to the message containing the code.`
            );
        }

        const filePath = `plugins/${text}.js`;

        fs.writeFileSync(filePath, m.quoted.text);

        await conn.sendMessage(from, {
            react: { text: "✅", key: m.key }
        });

        return reply(`✅ Saved successfully in:\n${filePath}`);

    } catch (error) {
        console.error("SFP Error:", error);

        await conn.sendMessage(from, {
            react: { text: "❌", key: m.key }
        });

        return reply(`❌ Failed to save file.\n\n${error.message}`);
    }
});