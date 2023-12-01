const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Affiche le menu help",
    permissions: "Aucune",

    async run(client, interaction) {
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle("Frostie - 100% 🇫🇷")
            .setDescription(`***Salut ${user.tag}!👋🏼***\n` +
                `***Moi, c'est ${client.user.username} ! Un bot Discord 100% 🇫🇷***\n` +
                "> _On m'a dit que tu avais besoin d'aide 🤔\n" +
                '> Alors, voici ma liste de commandes_ 🚀')
                .setColor(client.color)

        const select = new StringSelectMenuBuilder()
            .setCustomId('help')
            .setPlaceholder('Quel type de commande souhaitez-vous voir ?')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setEmoji("📚")
                    .setLabel('Principales')
                    .setDescription('Commandes principales')
                    .setValue('prin'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("👮")
                    .setLabel('Modération')
                    .setDescription('Commandes de modération')
                    .setValue('mod'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("🚀")
                    .setLabel('Fun')
                    .setDescription('Commandes de fun')
                    .setValue('fun'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("🔎")
                    .setLabel('Support 24/7')
                    .setDescription('Commandes reliées au support de Frostie')
                    .setValue('sup'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("❄️")
                    .setLabel('Toutes les commandes')
                    .setDescription('Toutes les commandes')
                    .setValue('tout'),
            );

        const row = new ActionRowBuilder().addComponents(select);

        interaction.reply({
            components: [row],
            embeds: [embed],
        });
    }
};