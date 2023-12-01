const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kick un membre du serveur",
    permissions: Discord.PermissionFlagsBits.KickMembers,
    options: [
        {
            type: "user",
            name: "user",
            description: "Le membre à kicker",
            required: true
        },
        {
            type: "string",
            name: "reason",
            description: "La raison du kick",
            required: false
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "Aucune raison spécifiée";

        if (user) {
            try {
                const member = await interaction.guild.members.fetch(user);

                if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
                    return interaction.reply({content: "Je n'ai pas la permission de kick des membres.", ephemeral: true});
                }

                await member.kick(reason);

                let embed = new Discord.EmbedBuilder()
                    .setTitle("⛔️ kick")
                    .setDescription(`${member.user.tag} a été kick du serveur pour le motif :  **${reason}**`)
                    .setColor(client.color);

                interaction.reply({ embeds: [embed] });

                let dm = new Discord.EmbedBuilder()
                    .setTitle("⛔️ Vous avez été kick")
                    .setDescription(
                    `**Serveur :** ${interaction.guild.name}\n` +
                    `**Modérateur :** <@${interaction.user.id}>\n` +
                    `**Raison spécifiée :** ${reason}`)
                    .setColor(client.color);

                member.user.send({ embeds: [dm] });

            } catch (error) {
                console.log(error);
                await interaction.reply({content: "Une erreur s'est produite lors du kick de l'utilisateur.", ephemeral: true});
            }
        } else {
            await interaction.reply({content: "Veuillez spécifier un utilisateur valide.", ephemeral: true});
        }
    }
};