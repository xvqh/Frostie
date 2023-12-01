const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const citation = require("../../citation.json")
module.exports = {
    name: 'citation',
    description: 'Obtenez une citation aléatoire.',

    async run(client, interaction) {
        try {
            
            const path = require('path');
const citationPath = path.join(__dirname, '../../citation.json');
const citations = JSON.parse(fs.readFileSync(citationPath, 'utf-8'));

            
            const citationAleatoire = citations[Math.floor(Math.random() * citations.length)];

           
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setTitle(`Citation de ${citationAleatoire.actor}`)
                .setDescription(`*${citationAleatoire.quote}*`)

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.log('Erreur lors de la récupération de la citation', error);
        }
    },
};