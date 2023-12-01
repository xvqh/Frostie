const Discord = require('discord.js');

module.exports = {
    name: "nickname",
    description: "Change the nickname of a user",
    permissions: Discord.PermissionFlagsBits.ManageNicknames,
    options: [
        {
            type: "user",
            name: "user",
            description: "L'utilisateur dont le surnom doit être changé",
            required: true
        },
        {
            type: "string",
            name: "nickname",
            description: "Le nouveau surnom",
            required: true
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const nickname = interaction.options.getString("nickname");

        if (!interaction.guild.me || !interaction.guild.me.permissions.has(Discord.PermissionFlagsBits.ManageNicknames)) {
            return interaction.reply({content: "vous n'avez pas la permission de changer les surnoms.", ephemeral: true});
        }

        if (user) {
            const member = interaction.guild.members.cache.get(user.id);

            if (member) {
                try {
                    await member.setNickname(nickname);

                    let embed = new Discord.EmbedBuilder()
                        .setTitle("👤 Nickname Changed")
                        .setDescription(`Le surnom de ${user.tag} a été changé en : **${nickname}**`)
                        .setColor(client.color);

                    interaction.reply({ embeds: [embed] });

                } catch (error) {
                    console.log(error);
                    await interaction.reply({content: "Une erreur s'est produite lors du changement de surnom.", ephemeral: true});
                }
            } else {
                await interaction.reply({content: "L'utilisateur n'est pas membre du serveur.", ephemeral: true});
            }
        } else {
            await interaction.reply({content: "Veuillez spécifier un utilisateur valide.", ephemeral: true});
        }
    }
};