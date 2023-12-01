const Discord = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const client = new Discord.Client({intents})
const commands = require('./Handlers/Commands')
const events = require('./Handlers/Events')
const config = require('./config')
const Commands = require('./Handlers/Commands')
const fs = require("fs")

client.commands = new Discord.Collection()
client.color = config.color
client.snipeMap = new Map();

client.on('messageDelete', message => {
    client.snipeMap.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });
});


client.login(config.token)
commands(client)
events(client)