const Discord = require("discord.js");

module.exports = {
    name: "delrole",
    description: "Retire un rôle à un membre",
    permissions: Discord.PermissionFlagsBits.ManageRoles,
    options: [
        {
            type: "user",
            name: "user",
            description: "Le membre a qui retirer le rôle",
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

        if (user && role) {
            try {
                const member = await interaction.guild.members.fetch(user.id);
                const roles = await interaction.guild.roles.fetch(role.id);

                let embed = new Discord.EmbedBuilder()
                .setTitle("Rôle retiré")
                .setDescription(`Le rôle **${roles}** a bien été retiré à ${user.tag} !`)
                .setColor("Red")

                
                if (member.roles.cache.has(roles.id)) {
                    await member.roles.remove(roles);
                    await interaction.reply({ embeds: [embed]});
                } else {
                    await interaction.reply({content: `${user.tag} n'a pas le rôle ${roles.name}.`, ephemeral: true});
                }
            } catch (error) {
                console.log(error);
                await interaction.reply({content: "Une erreur s'est produite lors du retrait du rôle.", ephemeral: true});
            }
        } else {
            await interaction.reply("Veuillez spécifier un utilisateur et un rôle valides.");
        }
    }
};