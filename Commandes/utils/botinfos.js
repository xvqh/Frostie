const Discord = require("discord.js")
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require("discord.js")
const djsv = require('../../package.json')
const os = require('os')

module.exports = {
    name: "botinfos",
    description: "🤖| Donnes des informations sur Frostie",
    permissions: "Aucune",

    async run(client, interaction) {
         let guildsCount = await client.guilds.fetch();
         const cpuUsage = os.cpus()[0].times;
    const totalUsage = Object.values(cpuUsage).reduce((a, b) => a + b, 0);
    const idle = cpuUsage.idle;
    const usagePercentage = ((totalUsage - idle) / totalUsage) * 100;

        const bot = new ButtonBuilder()
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        .setLabel("Ajoute Frostie sur ton serveur!")
        .setStyle(ButtonStyle.Link)
        .setEmoji("🔗")

        const row = new ActionRowBuilder().addComponents(bot);

        const botinfo = new EmbedBuilder()
        .setTitle('Frostie - 100% 🇫🇷')
        .setDescription(`***__Informations sur Frostie__*** 🤖\n` +
        `**Nombre de serveurs ►** \`${client.guilds.cache.size}\`!\n` +
          `**Uptime ►** <t:${parseInt(client.readyTimestamp / 1000)}:f> (<t:${parseInt(client.readyTimestamp / 1000)}:R>\n` +
          `**Prefix ►** Slash\n` +
          `**Version ►** 3.0.0 - JavaScript Rewrite\n\n` +
          `**__Informations avancées__** 🔎\n` +
          `**Ram ►** ${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB/16 384MB (${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%)\n` +
          `**CPU ►**  ${usagePercentage.toFixed(2)}%\n` +
          `**Discord.js ►** ${djsv.dependencies['discord.js']}
          `.replace("^", ""))
          .setColor(client.color)

        await interaction.reply({
            embeds: [botinfo],
            components: [row],
          });
    }
}