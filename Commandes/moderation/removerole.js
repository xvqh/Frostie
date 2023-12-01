const Discord = require("discord.js");

module.exports = {
    name: "remove-role",
    description: "Retire un rôle à un membre",
    permissions: Discord.PermissionFlagsBits.ManageRoles,
    options: [
        {
            type: "user",
            name: "user",
            description: "Le membre auquel retirer le rôle",
            required: true
        },
        {
            type: "role",
            name: "role",
            description: "Le rôle à retirer",
            required: true
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const role = interaction.options.getRole("role");

        if (!user || !role) {
            return interaction.reply({
                content: 'Membre ou rôle non spécifié.',
                ephemeral: true,
            });
        }

        const embed = new Discord.EmbedBuilder()
        .setTitle("Rôle retiré")
        .setDescription(`Le rôle **${role.name}** a bien été retiré de ${user.tag} !`)
        .setColor("Red")

        try {
            await user.roles.remove(role);
            interaction.reply({
                embeds: [embed]
            });
        } catch (error) {
            console.log(error);
            interaction.reply({
                content: 'Une erreur s\'est produite lors de l\'enlevement  du rôle.',
                ephemeral: true,
            });
        }
    }
};