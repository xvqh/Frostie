const { EmbedBuilder } = require("discord.js")
const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "fais un text en ascii",
    permissions: "Aucune",
    options: [
        {
            type: "string",
            name: "text",
            description: "le text en ascii",
            required: true        
        }
    ],

    async run(client, interaction) {
        const text = interaction.options.getString('text');

        figlet(text, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }

        const embed = new EmbedBuilder()
        .setColor(client.color)
        .setTitle('Texte ASCII')
        .setDescription('```' + data + '```');

    interaction.reply({ embeds: [embed] });
    })
}}