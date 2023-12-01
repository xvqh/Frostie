const Discord = require("discord.js")

module.exports = {

    name: "clear",
    description: "Pour Effacer des messages",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modération",
    dm: false,
    options: [
        {
            type: "integer",
            name: "nombre",
            description: "le nombre de message a supprimer",
            required: true
        },{
            type: "channel",
            name: "salon",
            description: "Le salon ou effacer les messages",
            required: false
        }
    ],
    
    async run(client, interaction) {
        let channel = interaction.options.getChannel("salon") || interaction.channel;

        if (channel.id !== interaction.channel.id && !interaction.guild.channels.cache.get(channel.id)) {
            return interaction.reply("Pas de salon !");
        }

        const number = interaction.options.getInteger("nombre");

        if (number <= 0 || number > 100) {
            return interaction.reply("Il nous faut un nombre entre `0` et `100` !");
        }

        try {
            const messages = await channel.bulkDelete(number);
            await interaction.deferReply();

            const embed = new Discord.EmbedBuilder()
                .setTitle("✅ | Messages supprimés")
                .setDescription(`J'ai bien supprimé \`${messages.size}\` message(s) dans le salon ${channel} !`)
                .setColor(client.color);

            await interaction.editReply({ embeds: [embed] });

        } catch (err) {
            const messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()];

            if (messages.length <= 0) {
                return interaction.reply("Aucun message à supprimer car ils datent tous de plus de 14 jours !");
            }

            await channel.bulkDelete(messages);

            await interaction.reply({
                content: `J'ai bien supprimé \`${messages.length}\` message(s) ${channel} car les autres datent de plus de 14 jours !`,
                ephemeral: true
            });
        }
    }
};