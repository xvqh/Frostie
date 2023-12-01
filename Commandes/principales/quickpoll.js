const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const { ChannelType } = require('discord.js');

module.exports = {
    name: "quickpoll",
    description: "Crée un sondage simple",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "string",
            name: "question",
            description: "La question du sondage",
            required: true,
        },{
            type: "channel",
            name: "channel",
            description: "Salon où le sondage sera envoyée",
            required: true,
        }
    ],

    async run(client, interaction) {
        const question = interaction.options.getString('question');
        const channel = interaction.options.getChannel('channel');

        if (channel.type !== ChannelType.GuildText) {
            return await interaction.reply({ content: 'Veuillez fournir un salon textuel.', ephemeral: true });
        }

        const pollEmbed = new EmbedBuilder()
            .setTitle(`Sondage : ${question}`)
            .setDescription("✅ - Oui\n❌ - Non")
            .setFooter({text: `Organisé pars ${interaction.user.tag}`})
            .setColor(client.color); 

        const pollMessage = await channel.send({ embeds: [pollEmbed] });
        
        
        await pollMessage.react('✅');
        await pollMessage.react('❌');

        await interaction.reply({ content: `Sondage envoyé dans ${channel}`, ephemeral: true });
    },
};