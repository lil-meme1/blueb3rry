const Discord = require('discord.js');
const MessageEmbed = require("discord.js");
module.exports = {
     name: "slotrndm",
     category: "fun",
     description: "Free symbol Slot machine",
     run: async (bot, message, args) => {

        var fruit = new Array('🍌','🍋','🍓','🍒','🍇','🍉','🍌','🍋');
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
        const embed = new Discord.MessageEmbed()
            .setColor(roleColor)
            .setDescription("\n" + 
                fruit[Math.floor(Math.random()*(fruit.length - 2))+1] + ' | ' + fruit[Math.floor(Math.random()*(fruit.length - 2))+1] + ' | ' + fruit[Math.floor(Math.random()*(fruit.length - 2))+1] + "\n"+
                fruit[Math.floor(Math.random()*(fruit.length - 2))+1] + ' | ' + fruit[Math.floor(Math.random()*(fruit.length - 2))+1] + ' | ' + fruit[Math.floor(Math.random()*(fruit.length - 2))+1] + "\n"+ //winning lane
                fruit[Math.floor(Math.random()*(fruit.length - 2))+1] + ' | ' + fruit[Math.floor(Math.random()*(fruit.length - 2))+1] + ' | ' + fruit[Math.floor(Math.random()*(fruit.length - 2))+1]
            )
            .setTimestamp()
            .setAuthor(message.author.username, message.author.displayAvatarURL());
        message.reply(embed);
    }
}