const Discord = require("discord.js")
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('database.sqlite');


db.run(`CREATE TABLE IF NOT EXISTS warns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guild_id TEXT,
    user_id TEXT,
    moderator_id TEXT,
    reason TEXT,
    timestamp INTEGER
)`);

module.exports = {
    name: "warn",
    description: "Avertit un membre du serveur",
    permissions: Discord.PermissionFlagsBits.ModerateMembers,
    options: [
        {
            type: "user",
            name: "user",
            description: "Le membre à avertir",
            required: true
        },
        {
            type: "string",
            name: "reason",
            description: "La raison de l'avertissement",
            required: false
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "Aucune raison spécifiée";

        if (user) {
            try {
                // Insérez le nouvel avertissement dans la table SQLite
                const insertQuery = 'INSERT INTO warns (guild_id, user_id, moderator_id, reason, timestamp) VALUES (?, ?, ?, ?, ?)';
                const values = [interaction.guild.id, user.id, interaction.user.id, reason, Date.now()];

                db.run(insertQuery, values, function(err) {
                    if (err) {
                        console.error('Erreur lors de l\'ajout de l\'avertissement dans la base de données SQLite :', err);
                        return interaction.reply("Une erreur s'est produite lors de l'avertissement.");
                    }

                    
                    const warnId = this.lastID;
                    const warn = new Discord.EmbedBuilder()
                .setTitle("✅ | Avertissement")
                .setDescription(`**${user.tag}** a été avertis pour le motif **${reason}**!`)
                .setColor(client.color)
                .setTimestamp();

                
                interaction.reply({embeds: [warn]});

                   
                    const embed = new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setTitle("👮 | Vous avez été avertis")
                        .setDescription(`**Serveur ➜** ${interaction.guild.name}(${interaction.guild.id}).\n**Raison ➜** ${reason}\n**Modérateur ➜** <@${interaction.user.id}>(${interaction.user.id})`)
                        .setTimestamp();

                    user.send({ embeds: [embed] });
                });

            } catch (error) {
                console.log(error);
                await interaction.reply({content: "Une erreur s'est produite lors de l'avertissement.", ephemeral: true});
            }
        } else {
            await interaction.reply({content: "Veuillez spécifier un utilisateur valide.", ephemeral: true});
        }
    }
};