const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('database.sqlite');

module.exports = {
    name: "clearwarn",
    description: "Supprime un avertissement d'un membre",
    permissions: Discord.PermissionFlagsBits.ModerateMembers,
    options: [
        {
            type: "user",
            name: "user",
            description: "Le membre à unwarn",
            required: true
        },
        {
            type: "integer",
            name: "numero",
            description: "Le numéro de l'avertissement à supprimer",
            required: true
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const numero = interaction.options.getInteger("numero");

        if (user && numero) {
            try {
                
                const selectQuery = 'SELECT * FROM warns WHERE guild_id = ? AND user_id = ? AND id = ?';
                const selectValues = [interaction.guild.id, user.id, numero];

                db.get(selectQuery, selectValues, (err, row) => {
                    if (err) {
                        console.log('Erreur lors de la vérification de l\'avertissement dans la base de données SQLite :', err);
                        return interaction.reply({content: "Une erreur s'est produite lors de la suppression de l'avertissement.", ephemeral: true});
                    }

                    if (!row) {
                        return interaction.reply({content: `Aucun avertissement trouvé pour l'utilisateur ${user.tag} avec le numéro ${numero}.`, ephemeral: true});
                    }

                    const deleteQuery = 'DELETE FROM warns WHERE guild_id = ? AND user_id = ? AND id = ?';
                    const deleteValues = [interaction.guild.id, user.id, numero];

                    db.run(deleteQuery, deleteValues, function(err) {
                        if (err) {
                            console.log('Erreur lors de la suppression de l\'avertissement dans la base de données SQLite :', err);
                            return interaction.reply({content: "Une erreur s'est produite lors de la suppression de l'avertissement.", ephemeral: true});
                        }

                        let embed = new Discord.EmbedBuilder()
                        .setTitle("✅ | Avertissement supprimé")
                        .setDescription(`L'avertissement numéro ${numero} pour l'utilisateur **${user.tag}** a été supprimé avec succès.`)
                        .setColor(client.color)

                        interaction.reply({embeds: [embed]});
                    });
                });

            } catch (error) {
                console.log(error);
                await interaction.reply({content: "Une erreur s'est produite lors de la suppression de l'avertissement.", ephemeral: true});
            }
        } else {
            await interaction.reply({content: "Veuillez spécifier un utilisateur et un numéro d'avertissement valide.", ephemeral: true});
        }
    }
};