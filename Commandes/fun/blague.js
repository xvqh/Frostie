const axios = require('axios');
const BlaguesAPI = require('blagues-api');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'blague',
    description: 'Envoie une blague au hasard.',
    permissions: 'Aucune',

    async run(client, interaction) {
    const blagues = new BlaguesAPI('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYyNjY0OTgwMjc2OTY5NDczIiwibGltaXQiOjEwMCwia2V5IjoiMGZseXhnajhYWFZHaHdNQ1RqelkzcXAydjBic0xhcXpURm5PQnZjY2FROEI1WjMyNE8iLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0xOFQxNzo1ODowMSswMDowMCIsImlhdCI6MTY4OTcwMzA4MX0.Mf8pdzquKHRAmfkQygHnINJf6gxpE161H-_gfNwSQJw');
    const blague = await blagues.random();
    const question = blague.joke;
    const reponse = blague.answer;

            const blagueEmbed = new EmbedBuilder()
                .setDescription(`**${question}**\n➜ ||${reponse}||`)
                .setColor(client.color);

            interaction.reply({ embeds: [blagueEmbed] });
        }
    };