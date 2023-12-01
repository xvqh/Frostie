const Discord = require("discord.js")

module.exports = {
    name: "addrole",
    description: "Ajoute un role a un membre",
    permissions: Discord.PermissionFlagsBits.ManageRoles,
    options: [
        {
            type: "user",
            name: "user",
            description: "Le membre a qui ajouté le role",
            required: true
        },{
            type: "role",
            name: "role",
            description: "le role a ajoutée",
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

                
                await member.roles.add(roles);

                let embed = new Discord.EmbedBuilder()
        .setTitle("Role ajouté")
        .setDescription(`Le rôle **${roles}** a bien été ajouté à ${user.tag} !`)
        .setColor(client.color)

                
                await interaction.reply({ embeds: [embed]});
            } catch (error) {
                console.log(error);
                await interaction.reply({content: "Une erreur s'est produite lors de l'ajout du rôle.", ephemeral: true});
            }
        } else {
            
            await interaction.reply({content: "Veuillez spécifier un utilisateur ou un rôle valides.", ephemeral: true});
        }
    }
};