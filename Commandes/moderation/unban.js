const Discord = require("discord.js")

module.exports = {

    name: "unban",
    description: "Pour unban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "l'utilisateur a débannir",
            required: true,
        }
    ],
    
    async run(client, interaction, args) {

        try {

            let user = args.getUser("utilisateur")
            if(!user) return interaction.reply({content: "Pas d'utilisateur !", ephemeral: true})

            if(!(await interaction.guild.bans.fetch()).get(user.id)) return interaction.reply({content: `❌ | ${user.tag} n'est pas bannis.`, ephemeral: true})

            await interaction.reply({content: `✅ | Le bannissement de ${user.tag} a bien été révoqué !`, ephemeral: true})

            await interaction.guild.members.unban(user)
        
        } catch (err) {

            return interaction.reply({content: "Pas d'utilisateur !", ephemeral: true})
        }
    }
}