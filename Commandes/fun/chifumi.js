const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'chifumi',
    description: 'Joue à pierre-feuille-ciseaux.',
    permissions: 'Aucune',
    options: [
        {
            type: 'string',
            name: 'choix',
            description: 'Votre choix (pierre, feuille, ciseaux)',
            required: true,
            choices: [
                {
                    name: 'Pierre',
                    value: 'pierre'
                },
                {
                    name: 'Feuille',
                    value: 'feuille'
                },
                {
                    name: 'Ciseaux',
                    value: 'ciseaux'
                }
            ]
        }
    ],

    async run(client, interaction) {
        await interaction.deferReply();
        const choices = ['pierre', 'feuille', 'ciseaux'];
        const userChoice = interaction.options.getString('choix');
    
        if (!choices.includes(userChoice)) {
           await interaction.editReply({content: 'Veuillez choisir entre "pierre", "feuille" ou "ciseaux".', ephemeral: true});
            return;
        }

        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        const startEmbed = new EmbedBuilder()
            .setTitle('🎮|Chifumis')
            .setDescription('chifumi... <a:e_chargement3:1172970096285732944>')
            .setColor(client.color);

        await interaction.editReply({ embeds: [startEmbed] });

        
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result = getResult(userChoice, botChoice);

        const chifoumiEmbed = new EmbedBuilder()
            .setTitle('🎮|Chifumis')
            .setDescription(`Tu as choisi **${userChoice}** et moi, **${botChoice}**\n\n${result}`)
            .setColor("#FFFFFF");

        interaction.editReply({ embeds: [chifoumiEmbed] });
    },
};

function getResult(user, bot) {
    if (user === bot) return 'Égalité !';
    if (
        (user === 'pierre' && bot === 'ciseaux') ||
        (user === 'feuille' && bot === 'pierre') ||
        (user === 'ciseaux' && bot === 'feuille')
    ) {
        return 'Vous avez gagné !';
    } else {
        return 'Vous avez perdu !';
    }
}