const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "membercount",
    description: "Obtient le nombre de membre sur le serveur",
    permissions: "Aucune",

    async run(client, interaction) {

        const memberCount = interaction.guild.members.cache.size;

        const embed = new EmbedBuilder()
        .setTitle("⭐️ | Nombre de membres")
        .setDescription(`Le serveur compte actuellement **${memberCount}** !`)
        .setColor(client.color)

        interaction.reply({
            embeds: [embed]
        })
    }
}