const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Affiche les informations du serveur.',
    permissions: 'Aucune',

    async run(client, interaction) {
        try {
            const { guild } = interaction;
            await interaction.guild.fetch();

            const replyMessage = await interaction.reply({ content: 'Chargement...', fetchReply: true });

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setTitle('Informations du serveur')
                .setThumbnail(guild.iconURL())
                .setImage(guild.bannerURL())
                .addFields(
                    {
                        name: '➔ Informations',
                        value: `> **\`•\` Nom du serveur :** ${guild.name}\n> **\`•\` ID du serveur :** ${guild.id}\n> **\`•\` Propriétaire :** <@${(await guild.fetchOwner()).user.id}> \`${(await guild.fetchOwner()).user.tag}\`\n> **\`•\` Date de création :** <t:${parseInt(guild.createdAt / 1000)}:f> (<t:${parseInt(guild.createdAt / 1000)}:R>)`,
                        inline: false
                    },
                    {
                        name: '➔ Statistiques (Partie 1)',
                        value: `> **\`•\` Membres :** ${guild.memberCount}\n> **\`•\` Niveau de boost :** ${guild.premiumTier} (${guild.premiumSubscriptionCount} boost(s))\n> **\`•\` Emojis :** ${guild.emojis.cache.size}`,
                        inline: false
                    },
                )
                .setTimestamp();

            replyMessage.edit({ content: null, embeds: [embed] });
        } catch (error) {
            console.log('Erreur lors de la récupération des informations du serveur', error);
        }
    }
};