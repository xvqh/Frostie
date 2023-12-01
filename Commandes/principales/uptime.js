const { EmbedBuilder } = require("discord.js");

module.exports = {

    name: "uptime",
    description: "Savoir depuis combien de temps le bot est en ligne.",
    permission: "Aucune",
    dm: true,
    async run(client, message) {
        
        const uptimeTimestamp = Date.now() - (process.uptime() * 1000);

        const uptimebed = new EmbedBuilder()
          .setTitle("📊 | Uptime ")
          .setDescription(`Le bot est en ligne depuis <t:${Math.round(uptimeTimestamp / 1000)}:R>`)
          .setColor(client.color)

        await message.reply({ embeds: [uptimebed] })
        
    }
}