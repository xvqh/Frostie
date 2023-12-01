const Discord = require("discord.js")

module.exports = {
    name: "invite",
    description: "Obtient l'invite du bot",
    permissions: "Aucune",

    async run(client, interaction) {

        let btn = new Discord.ButtonBuilder()
        .setLabel("Ajoute moi !")
        .setEmoji("🔗")
        .setStyle(Discord.ButtonStyle.Link)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)

        const row = new Discord.ActionRowBuilder().addComponents(btn);

        let embed = new Discord.EmbedBuilder()
        .setTitle("👋🏼 Hey! Moi c'est Frostie!")
        .setDescription("Je suis le bot discord parfait pour vos serveurs discord ! Qu'attends-tu pour m'ajouter ? Fonce, et clique sur le boutton !")
        .setColor(client.color)

        interaction.reply({
            embeds: [embed],
            components: [row]
        })
        
    }
}