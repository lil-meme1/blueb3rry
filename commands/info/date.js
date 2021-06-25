const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
module.exports = {
    name: "date",
    category: "info",
    description: "Tells you the current date.",

    run: async (bot, message, args) => {

        //var currDate = new Date().toJSON().slice(0,10).replace(/-/g,'');
        var currDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');

        const embed = new Discord.MessageEmbed();
            embed.setColor(`0x00ff00`);
            embed.setTitle(currDate);
        message.channel.send(embed);

    }
}