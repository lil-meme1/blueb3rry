const { readdirSync }= require("fs");
var fs = require('fs');
const { stripIndents } = require("common-tags");
const Discord = require('discord.js');
module.exports = {
    name: "help",
    category: "info",
    description: "Sends a list of all commands",
    run: async (bot, message, args) => {

        if(args[0]){
            return getCMD(bot, message, args[0]);
        }else{
            return getAll(bot, message);
        }
    }
}

function getAll(bot , message){

    const embed = new Discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)

    const commands = (category) =>{

        return bot.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");

    }

    const info = bot.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);
    return message.channel.send(embed.setDescription(info));
}

function getCMD(bot, message, input){

    const embed = new Discord.MessageEmbed()
    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));
    let info = `No information found **${input.toLowerCase()}**`;

    if(!cmd){

        return message.channel.send(embed.setColor("RED").setDescription(info));
        
    }

    if(cmd.name) info = `**Command name:** ${cmd.name}`;
    if(cmd.aliases) info += `\n**Aliases:** ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if(cmd.description) info += `\n**Description:** ${cmd.description}`;
    if(cmd.usage){

        info += `\n**Usage:** ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] optional`)

    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));

}