const Discord = require("discord.js")

module.exports = {
    name: "unlock",
    description: "Déverrouille un salon",
    permissions: Discord.PermissionFlagsBits.ManageChannels,
    async run(client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true })

        interaction.reply({content: `Le salon est déverrouillé !`, ephemeral: true})
    }
}