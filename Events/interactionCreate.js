const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const Discord = require("discord.js")
const config = require("../config")
const fs = require("fs")
const { ChannelType } = require("discord.js")

const ticketParams = new Map();

module.exports = async (client, interaction) => {
        if (interaction.type === Discord.InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            if (command) {
                command.run(client, interaction, interaction.options);
            } else {
                console.error(`Commande non trouvée: ${interaction.commandName}`);
            }
        } else if (interaction.isSelectMenu()) {

            if (interaction.customId === 'help') {
                const selectedValue = interaction.values[0];
            switch (selectedValue) {
                    case 'prin':
                        await sendPrincipalCommandsEmbed(interaction);
                        break;
                    case 'mod':
                        await sendModerationCommandsEmbed(interaction);
                        break;
                    case 'fun':
                        await sendFunCommandsEmbed(interaction)
                        break;
                    case 'sup':
                        await sendSupportCommandsEmbed(interaction)
                        break;
                    case 'tout':
                        await sendToutCommandsEmbed(interaction)
                        break;
                    default:
                        break;
                }
            }
        }
    };
    
    
    async function sendPrincipalCommandsEmbed(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Commandes Principales 📚')
            .setDescription(
                '**/botinfos** : Affiche des informations sur Frostie\n' +
                '**/credits** : Obtiens les crédits de Frostie\n' +
                '**/embed** : Crée un embed\n' +
                '**/membercount** : Affiche le nombre de membres\n' +
                '**/ping** : Affiche la latence du bot\n' +
                '**/quickpoll** : Fait un sondage rapide\n' +
                '**/say** : Fait parler Frostie\n' +
                '**/serverinfo** : Affiche des informations sur le serveur\n' +
                '**/uptime** : Affiche l\'uptime du bot\n' +
                '**/userinfo** : Affiche des informations sur un utilisateur\n' +
                '**/mp** : Envoie un message privé à un membre'
              )
              .setColor("#FFFFFF")
        
        await interaction.update({ embeds: [embed] });
    }
    
    
    async function sendModerationCommandsEmbed(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Commande de Modération 👮')
            .setDescription(
                '**/add-role** : Ajoute un rôle à un membre\n' +
                '**/ban** : Bannit un membre\n' +
                '**/clear** : Supprime un nombre de messages\n' +
                '**/clearall** : Supprime tous les messages du salon\n' +
                '**/clearwarn** : Supprime tous les warns d\'un membre\n' +
                '**/kick** : Expulse un membre\n' +
                '**/lock** : Bloque le salon\n' +
                '**/nickname** : Change le pseudonyme d\'un membre\n' +
                '**/remove-role** : Supprime un rôle d\'un membre\n' +
                '**/timeout** : Bannit temporairement un membre\n' +
                '**/unban** : Révoque le bannissement définitif d\'un membre\n' +
                '**/unlock** : Débloque le salon\n' +
                '**/unwarn** : Supprime le warn d\'un membre\n' +
                '**/warn** : Avertis un membre\n' +
                '**/warnlist** : Affiche les avertissements d\'un membre'
              )
              .setColor("#FFFFFF")
        
        await interaction.update({ embeds: [embed] });
    }

    async function sendSupportCommandsEmbed(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Support 24/7 🕵️')
            .setDescription(
                '**/invite** ➜ Envoie le lien d\'invitation de Frostie\n' +
                '**/support** ➜ Envoie le lien d\'invitation du serveur support'
              )
              .setColor("#FFFFFF")

              await interaction.update({ embeds: [embed] });
    }

    async function sendFunCommandsEmbed(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Commandes Fun 🎉')
            .setDescription(
                '**/avatar** ➜ Affiche l\'avatar d\'un membre\n' +
                '**/blague** ➜ Envoie une blague au hasard\n' +
                '**/chifumi** ➜ Joue à chifumi avec Frostie\n' +
                '**/citation** ➜ Envoie une citation aléatoire\n' +
                '**/ascii** ➜ Génère un texte en ASCII'
              )
              .setColor("#FFFFFF")

              await interaction.update({ embeds: [embed] });
    }

     async function sendToutCommandsEmbed(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Toutes les commandes ❄️')
            .setDescription(
                '**Commandes Principales 📚**\n' +
                '**/botinfos** ➜ Affiche des informations sur Frostie\n' +
                '**/credits** ➜ Obtiens les crédits de Frostie\n' +
                '**/embed** ➜ Crée un embed\n' +
                '**/membercount** ➜ Affiche le nombre de membres\n' +
                '**/ping** ➜ Affiche la latence du bot\n' +
                '**/quickpoll** ➜ Fait un sondage rapide\n' +
                '**/say** ➜ Fait parler Frostie\n' +
                '**/serverinfo** ➜ Affiche des informations sur le serveur\n' +
                '**/uptime** ➜ Affiche l\'uptime du bot\n' +
                '**/userinfo** ➜ Affiche des informations sur un utilisateur\n' +
                '**/mp** ➜ Envoie un message privé à un membre\n\n' +
                
                '**Commandes de Modération 👮**\n' +
                '**/add-role** ➜ Ajoute un rôle à un membre\n' +
                '**/ban** ➜ Bannit un membre\n' +
                '**/clear** ➜ Supprime un nombre de messages\n' +
                '**/clearall** ➜ Supprime tous les messages du salon\n' +
                '**/clearwarn** ➜ Supprime tous les warns d\'un membre\n' +
                '**/kick** ➜ Expulse un membre\n' +
                '**/lock** ➜ Bloque le salon\n' +
                '**/nickname** ➜ Change le pseudonyme d\'un membre\n' +
                '**/remove-role** ➜ Supprime un rôle d\'un membre\n' +
                '**/timeout** ➜ Bannit temporairement un membre\n' +
                '**/unban** ➜ Révoque le bannissement définitif d\'un membre\n' +
                '**/unlock** ➜ Débloque le salon\n' +
                '**/unwarn** ➜ Supprime le warn d\'un membre\n' +
                '**/warn** ➜ Avertis un membre\n' +
                '**/listwarns** ➜ Affiche les avertissements d\'un membre\n\n' +
            
                '**Commandes Fun 🎉**\n' +
                '**/avatar** ➜ Affiche l\'avatar d\'un membre\n' +
                '**/blague** ➜ Envoie une blague au hasard\n' +
                '**/chifumi** ➜ Joue à chifumi avec Frostie\n' +
                '**/citation** ➜ Envoie une citation aléatoire\n' +
                '**/ascii** ➜ Génère un texte en ASCII\n\n' +
            
                '**Support 24/7 🕵️**\n' +
                '**/invite** ➜ Envoie le lien d\'invitation de Frostie\n' +
                '**/support** ➜ Envoie le lien d\'invitation du serveur support'
              )
              .setColor("#FFFFFF")

              await interaction.update({ embeds: [embed] });
            }