const Discord = require("discord.js")
const SlashCommands = require("../Handlers/slashCommands")
const config = require("../config")
const { ActivityType } = require("discord.js")

module.exports = async client => {

await SlashCommands(client)



client.on('messageCreate', message => {

  
  if (message.author.bot) return;

  
  const isOnlyBotMention = message.content.replace(/<@!?(\d+)>/g, '').trim() === '' && message.mentions.users.has(client.user.id);

  
  const isReplyToBot = message.reference && message.reference.messageId ? (message.channel.messages.cache.get(message.reference.messageId)?.author.id === client.user.id) : false;


  if (isOnlyBotMention && !isReplyToBot) {
    const embed  = new Discord.EmbedBuilder()
    .setDescription(`> Bonjour, je suis __Frostie__ <:Frostie:1172932233477238946>
    > J'ai été conçu pour gérer, modérer et protéger votre serveur !
    > Je fonctionne en __Slash Commands__`)
    .setColor(client.color)
      message.reply({embeds: [embed]});
  }
});

    console.log(`${client.user.tag} est bien en ligne`)
    console.log(`> [INVITE]: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
    client.user.setStatus('dnd');

    client.user.setActivity("Frostie V1.0.0", {
      type: ActivityType.Streaming,
      url : "https://twitch.tv/emilioottv"
    });
    client.user.setStatus('dnd');
}