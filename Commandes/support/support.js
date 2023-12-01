const Discord = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "support",
    description: "Tu as besoin d'aide ?",
    permissions: "Aucune",

    async run(client, interaction) {

        let btn = new Discord.ButtonBuilder()
        .setLabel("Serveur Support")
        .setEmoji("☎️")
        .setStyle(Discord.ButtonStyle.Link)
        .setURL(config.support)

        const row = new Discord.ActionRowBuilder().addComponents(btn);

        let embed = new Discord.EmbedBuilder()
        .setTitle(`👋🏼 Salut, ${interaction.user.username} !`)
        .setDescription(`**Tu as besoin d'aide ?** 
        *Le serveur support est fait pour ça !*\n\n` +
        `**Tu préfère la communication par e-mail ?**
        *${config.email}*`
        )
        .setColor(client.color)

        interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
}