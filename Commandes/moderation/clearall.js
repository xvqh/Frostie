const Discord = require("discord.js")

module.exports = {
    name: "clearall",
    description: "Supprime tous les messages du salon",
    permissions: Discord.PermissionFlagsBits.ManageMessages,

    async run(client, interaction) {
        try {
            
            const yes = new Discord.EmbedBuilder()
                .setTitle("⚠️ | Confirmation")
                .setDescription("Êtes-vous sûr de vouloir supprimer tous les messages de ce salon ? Cette action est irréversible.")
                .setFooter({ text: "Les messages ne doivent pas dater de plus de 14 jours.\nLa limite de suppression de messages est de 100."})
                .setColor(client.color); 

            
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('oui')
                        .setLabel('✅ Oui, j\'en suis sûr')
                        .setStyle(Discord.ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('👎 Finalement Non')
                        .setStyle(Discord.ButtonStyle.Danger), 
                );

                let embed = new Discord.EmbedBuilder()
                .setTitle("❌ | Action annulée")
                .setDescription("La suppression des messages a été annulée.")
                .setColor("Red")

                let delembed = new Discord.EmbedBuilder()
                .setTitle("✅ | Messages supprimés")
                .setDescription("Tous les messages du salon ont été supprimés avec succès.")
                .setColor("Green")

            
            await interaction.reply({ embeds: [yes], components: [row], ephemeral: true });

            
            const filter = i => {
                i.deferUpdate();
                return i.customId === 'oui' || i.customId === 'no';
            };

            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async i => {
                if (i.customId === 'oui') {
                    
                    const messages = await interaction.channel.messages.fetch({ limit: 100 });
                    await interaction.channel.bulkDelete(messages, true);
                    await interaction.followUp({embeds: [delembed], ephemeral: true});
                } else {
                    await interaction.followUp({embeds: [embed], ephemeral: true});
                }
                row.components.forEach(component => component.setDisabled(true));
                await interaction.editReply({ components: [row], ephemeral: true });
                collector.stop();
            });

            collector.on('end', collected => {
                row.components.forEach(component => component.setDisabled(true));
                interaction.editReply({ components: [row], ephemeral: true });
            });
        } catch (error) {
            console.log(error);
            await interaction.reply({content: "Une erreur s'est produite lors de la suppression des messages.", ephemeral: true});
        }
    }
};