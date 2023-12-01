const Discord = require("discord.js")

module.exports = {
    name: "mp",
    description: "mp un memmbre a partir du bot",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "user",
            name: "user",
            description: "le message a envoyer",
            required: true
        },{
            type: "string",
            name: "message",
            description: "le message a envoyé",
            required: true
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser("user")
        const message = interaction.options.getString("message")

        if (!user) {
            return message.reply('Veuillez mentionner un membre.');
        }

        user.send(`Vous avez reçu un message de <@${interaction.user.id}>\n> message: **${message}**`)
        interaction.reply({content: `Message envoyer a <@${user.id}>`, ephemeral: true})
    }
}