const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "credits",
    description: "Obtient les crédits du bot",
    permissions: "Aucune",

    async run(client, interaction) {

        const embed = new EmbedBuilder()
        .setTitle("Frostie - Credits 🇫🇷")
        .setDescription(`Les créateurs du projet n'est qu'autre que **! Noxtro et sewinou** 👑
        À ses débuts.
        Frostie ne possède pas pour le moment d'équipe de développement, il est développé uniquement et totalement par ces créateur, **! Noxtro et sewinou** 🚀`)
        .setColor(client.color)

        interaction.reply({
            embeds: [embed]
        })
    }
}