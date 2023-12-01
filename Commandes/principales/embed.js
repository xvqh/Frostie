const Discord = require("discord.js");
 
module.exports = {
 
  name: 'embed',
  description: 'Envoyer un embed personnalisé',
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "Modération",
  options: [],
 
    async run(client, message) {

        try {
        
            const Modal = new Discord.ModalBuilder()
            .setCustomId('report')
            .setTitle('Créé ton embed')

            const question1 = new Discord.TextInputBuilder()
            .setCustomId('titre')
            .setLabel('Quel titre voulez-vous mettre ?')
            .setRequired(false)
            .setPlaceholder('Ecrit ici... (facultatif)')
            .setStyle(Discord.TextInputStyle.Short)

            const question2 = new Discord.TextInputBuilder()
            .setCustomId('description')
            .setLabel("Quelle description voulez-vous mettre ?")
            .setRequired(true)
            .setPlaceholder('Ecrit ici...')
            .setStyle(Discord.TextInputStyle.Paragraph)

            const question3 = new Discord.TextInputBuilder()
            .setCustomId('couleur')
            .setLabel('Quelle couleur voulez-vous mettre ?')
            .setRequired(false)
            .setPlaceholder('Dans ce format : #3dffcc (facultatif)')
            .setStyle(Discord.TextInputStyle.Short)

            const question4 = new Discord.TextInputBuilder()
            .setCustomId('footer')
            .setLabel('Quelle footer voulez-vous mettre ?')
            .setRequired(false)
            .setPlaceholder('Ecrit ici... (facultatif)')
            .setStyle(Discord.TextInputStyle.Short)

            const question5 = new Discord.TextInputBuilder()
            .setCustomId('timestamp')
            .setLabel('Voulez-vous mettre le timestamp ?')
            .setRequired(false)
            .setPlaceholder('oui/non (facultatif)')
            .setStyle(Discord.TextInputStyle.Short)

            const ActionRow1 = new Discord.ActionRowBuilder().addComponents(question1);
            const ActionRow2 = new Discord.ActionRowBuilder().addComponents(question2);
            const ActionRow3 = new Discord.ActionRowBuilder().addComponents(question3);
            const ActionRow4 = new Discord.ActionRowBuilder().addComponents(question4);
            const ActionRow5 = new Discord.ActionRowBuilder().addComponents(question5);

            Modal.addComponents(ActionRow1, ActionRow2, ActionRow3, ActionRow4, ActionRow5);

            await message.showModal(Modal);

            const reponse = await message.awaitModalSubmit({time: 300000});
            
            let titre = reponse.fields.getTextInputValue('titre');
            let description = reponse.fields.getTextInputValue('description');
            let couleur = reponse.fields.getTextInputValue('couleur');
            let footer = reponse.fields.getTextInputValue('footer');
            let timestamp = reponse.fields.getTextInputValue('timestamp');
            
            const EmbedBuilder = new Discord.EmbedBuilder()
            .setColor(client.color)
            .setDescription(`✅ Votre embed à été envoyer avec succès !`)
            
            if(!couleur) couleur = client.color;
            if(!footer) footer = ' ';
            if(!titre) titre = ' ';
            if(!description) description = ' ';
            
            const EmbedBuilder1 = new Discord.EmbedBuilder()
            .setColor(`${couleur}`)
            .setTitle(`${titre}`)
            .setDescription(`${description}`)
            .setFooter({ text: `${footer}` })
            
            if(reponse.fields.getTextInputValue('timestamp') === 'oui') EmbedBuilder1.setTimestamp()
            if(!reponse.fields.getTextInputValue('timestamp') === 'oui') return;
            
            await reponse.reply({embeds: [EmbedBuilder], ephemeral: true});
            await message.channel.send({embeds: [EmbedBuilder1]});
        
        } catch (err) {

          console.log(err);

          message.reply({content: 'Une erreur inattendu c\'est produite . Veulliez réssayer !', ephemeral: true});
        }
    }
}   