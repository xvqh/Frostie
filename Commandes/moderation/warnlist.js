const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const Discord = require("discord.js")
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('database.sqlite');

db.run(`
    CREATE TABLE IF NOT EXISTS warnings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT,
        user_id TEXT,
        moderator_id TEXT,
        reason TEXT
    )
`);

module.exports = {
    name: "warnlist",
    description: "Affiche les avertissements d'un membre",
    permissions: Discord.PermissionFlagsBits.ModerateMembers,
    options: [
        {
            type: "user",
            name: "user",
            description: "Le membre pour lequel vous souhaitez voir les avertissements",
            required: true
        }
    ],

    async run(client, interaction) {
        const member = interaction.options.getUser('user');

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({ content: 'Vous n\'avez pas les autorisations nécessaires pour utiliser cette commande.', ephemeral: true });
        }

        db.all('SELECT * FROM warnings WHERE guild_id = ? AND user_id = ?', [interaction.guild.id, member.id], async (err, rows) => {
            if (err) {
                console.log(err, rows);
                return interaction.reply({ content: 'Erreur', ephemeral: true });
            }

            if (rows.length === 0) {
            const pdp = client.user.displayAvatarURL();
                const embed = new EmbedBuilder()
                    .setTitle(`Avertissements de ${member.tag} (Page 1/1)`)
                    .setColor(client.color)
                    .setDescription(`**${member.tag}** n'a aucun avertissement sur ce serveur`)
.setFooter({ text: `Démandé par ${interaction.user.tag}`, iconURL: pdp })
                return interaction.reply({ embeds: [embed] });
            }

            const warningsPerPage = 4;
            const pages = [];
            for (let i = 0; i < rows.length; i += warningsPerPage) {
                const page = rows.slice(i, i + warningsPerPage);
                pages.push(page);
            }

            const generateEmbed = (pageIndex) => {
            const pdp = client.user.displayAvatarURL();
                const embed = new EmbedBuilder()
                    .setTitle(`Avertissements de ${member.tag} (Page ${pageIndex + 1}/${pages.length})`)
                    .setColor(client.color)
.setFooter({ text: `Démandé par ${interaction.user.tag}`, iconURL: pdp });
                const page = pages[pageIndex];
                page.forEach((row, index) => {
                    const reason = row.reason ? `**Raison :** ${row.reason}` : 'Aucune raison spécifiée';

                    embed.addFields(
                        { name: `Avertissement #${index + 1}`, value: `Modérateur : <@${row.moderator_id}>\n${reason}\n**ID :** ${row.id}` }
                    );
                });

                return embed;
            };

            let currentPage = 0;

            try {
                await interaction.reply({
                    embeds: [generateEmbed(currentPage)],
                    components: [generateButtons()],
                });

                function generateButtons() {
                    return new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('prev_page')
                            .setEmoji("<:gauche:1173673841965416578>")
                            .setStyle(Discord.ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('next_page')
                            .setEmoji("<:droite:1173673865155727360>")
                            .setStyle(Discord.ButtonStyle.Secondary)
                    );
                }
                const collector = interaction.channel.createMessageComponentCollector({ time: 120000 });

                collector.on('collect', async (buttonInteraction) => {
                    try {
                        if (buttonInteraction.customId === 'prev_page') {
                            currentPage = (currentPage - 1 + pages.length) % pages.length;
                        } else if (buttonInteraction.customId === 'next_page') {
                            currentPage = (currentPage + 1) % pages.length;
                        }
                        await buttonInteraction.update({
                            embeds: [generateEmbed(currentPage)],
                            components: [generateButtons()],
                        });
                    } catch (error) {
                        console.log(error);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        });
    }
};