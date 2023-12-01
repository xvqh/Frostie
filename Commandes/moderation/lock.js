const { EmbedBuilder } = require('discord.js')
const Discord = require("discord.js")

module.exports = {
    name: "lock",
    description: "Verrouille un salon",
    permissions: Discord.PermissionFlagsBits.ManageChannels,
    options: [
      {
        type: "string",
        name: "reason",
        description: "Raison",
        required: false,
        autocomplete: false
      }
    ],
    async run(client, interaction) {
      await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false })

      const reason = interaction.options.getString("reason") || "Aucune raison";

      const channel = await interaction.guild.channels.cache.get(interaction.channel.id);

      const embed = new EmbedBuilder()
        .setTitle("Salon verrouiller")
        .setDescription(`Le salon ${channel} a été verrouiller !`)
        .addFields(
          { name: "Modérateur", value: `${interaction.user}`, inline: false },
          { name: "Raison", value: `${reason}`, inline: false },
        )
        .setColor(client.color)
        .setTimestamp()  

      interaction.channel.send({ embeds: [embed] })
    }
}