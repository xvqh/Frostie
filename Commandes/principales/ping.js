const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: 'Obtient le ping du bot',
    permissions: "Aucune",

    async run(client, interaction) {

        const ping = new EmbedBuilder()
        .setTitle("Pong! 🏓")
        .setDescription(`La latence du bot est de **${client.ws.ping}ms**`)
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setColor(client.color)

        interaction.reply({
            embeds: [ping]
        })
    }
}