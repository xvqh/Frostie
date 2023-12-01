const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Affiche l\'avatar d\'un membre.',
    permissions: 'Aucune',
    options: [
        {
            type: "user",
            name: "user",
            description: "Le membre dont vous souhaitez l'avatar",
            required: false
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser('user') || interaction.user

        const avatarEmbed = new EmbedBuilder()
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor(client.color);

        interaction.reply({ embeds: [avatarEmbed] });
    },
};