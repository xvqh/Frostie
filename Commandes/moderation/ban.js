const Discord = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bannit un membre du serveur",
    permissions: Discord.PermissionFlagsBits.BanMembers,
    options: [
        {
            type: "user",
            name: "user",
            description: "Le membre à bannir",
            required: true
        },
        {
            type: "string",
            name: "reason",
            description: "La raison du bannissement",
            required: false
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "Aucune raison spécifiée";

        if (user) {
            try {
                const member = await interaction.guild.members.fetch(user.id);

                
                if (member.bannable) {
                    
                    await member.ban({ reason: reason });

                    let embed = new Discord.EmbedBuilder()
                    .setTitle("⛔️ Bannissement")
                    .setDescription(`${user.tag} a été banni du serveur pour le motif suivant :  ${reason}`)
                    .setColor(client.color)

                    let dm = new Discord.EmbedBuilder()
                    .setTitle("⛔️ Vous avez été banni")
                    .setDescription(
                    `**Serveur :** ${interaction.guild.name}\n` +
                    `**Modérateur :** <@${interaction.user.id}>\n` +
                    `**Raison spécifiée :** ${reason}`)
                    .setColor(client.color)

                    
                    await interaction.reply({embeds: [embed]});
                    await user.send({embeds: [dm]})
                } else {
                    
                    await interaction.reply({content: `J'ai pas les permissions de bannir ${user.tag}`, ephemeral: true});
                }
            } catch (error) {
                console.log(error);
                await interaction.reply({content: "Une erreur s'est produite lors du bannissement.", ephemeral: true});
            }
        } else {
            
            await interaction.reply({content: "Veuillez spécifier un utilisateur valide.", ephemeral: true});
        }
    }
};