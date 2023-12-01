const ms = require('ms');
const { EmbedBuilder } = require('discord.js');
const Discord = require("discord.js")

module.exports = {
    name: "timeout",
    permissions: Discord.PermissionFlagsBits.MuteMembers,
    description: "Mute/timeout un utilisateur avec une raison facultatif",
    options: [
      {
        type: "user",
        name: "user",
        description: "Utilisateur",
        required: true,
      },
      {
        type: "string",
        name: "time",
        description: "durée",
        required: true,
        autocomplete: false
      },
      {
        type: "string",
        name: "reason",
        description: "Raison",
        required: false,
        autocomplete: false
      }
    ],
    async run(client, interaction) {
      const target = interaction.options.getMember("user")
      const duration = interaction.options.getString("time")
      const reason = interaction.options.getString("reason") || "Aucune raison";
      const convertedTime = ms(duration);

      if(target.user.bot) return interaction.reply({content: "Je ne peux pas mute un bot", ephemeral: true})

      if(target.id === client.user.id) return interaction.reply({content: "Je ne suis pas fou, mais j'ai du mal à accepter ta demande. 👀", ephemeral: true})

      if(!duration.endsWith("s") && !duration.endsWith("h") && !duration.endsWith("d") && !duration.endsWith("m")) return interaction.reply({content: "La durée du mute n'est pas le bon format !\n\n*Aide :*\n> Jours : `d`\n> Heures : `h`\n> Minutes : `m`\n> Secondes : `s`", ephemeral: true})
      if(target.isCommunicationDisabled()) return interaction.reply({content: "Ce memrbe est déjà mute !", ephemeral: true})
      if(ms(duration) > 2246400000) return interaction.reply({content: "Les mutes ne peuvent pas durer plus de 27 jours !", ephemeral: true})
      if(interaction.member.roles.highest.comparePositionTo(target.roles.highest) <= 0) return interaction.reply("\`❌ Erreur :\` Vous ne pouvez pas mute ce membre !")
      if(!target.moderatable) return interaction.reply(" \`❌ Erreur :\` Je ne peux pas mute ce membre !")
      if(target.user.id === interaction.user.id) return interaction.reply({content: "C'est bête ça non ?", ephemeral: true})
      if((await interaction.guild.fetchOwner()).id === target.user.id) return interaction.reply({content: "mute l'owner, c'est impossible !", ephemeral: true})

      const embedpv = new EmbedBuilder()
      .setTitle("Sanction")
      .setDescription(`Vous venez d'être **exclu temporairement** du serveur **${interaction.guild.name}**\n**Raison :** ${reason}\n**Fin de la sanction :** ${duration}`.replace("m", " minutes").replace("s", " secondes").replace("h", " heures").replace("d", " jours"))
      .setFooter({
          text: interaction.guild.name,
          iconURL: interaction.guild.iconURL({dynamic: true})
      })
      .setColor(client.color)  

      target.send({ embeds: [embedpv] }).catch(() => target.timeout(convertedTime, reason))
      target.timeout(convertedTime, reason).catch(() => target.timeout(convertedTime, reason))
      interaction.reply({content: `C'est fait ! J'ai bien timeout le membre ${target} !`, ephemeral: true})

      const embed = new  EmbedBuilder()
        .setTitle("Membre timeout")
        .setDescription(`Un membre a été timeout du serveur **${interaction.guild.name}**`)
        .addFields(
          { name: "Membre", value: `${target.user.tag}`, inline: false },
          { name: "Durée", value: `${ms(ms(duration), {long: true})}`.replace("days", "jours").replace("day", "jour").replace("hours", "heures").replace("hour", "heure").replace("second", "seconde").replace("seconds", "secondes") },
          { name: "Raison", value: `${reason}`, inline: false },
        )
        .setColor(client.color)
        .setTimestamp()  

      interaction.reply({ embeds: [embed] })
    }

  }