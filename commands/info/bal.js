const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
let coins = require(`./coins.json`);
const { getMember } = require("../../functions.js");
const fs = require('fs');
module.exports = {
  name: "bal",
  category: "info",
  description: "Tells you your currency balance",
  run: async (bot, message, args) => {

    const member = getMember(message, args.join(" "));
    if(message.deletable) message.delete();
    const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
      
    //creates coin data if none is found
    if(!coins[member.user.id]){

      coins[member.user.id]= {
        coins: 0
      };

    }

    //shows users coin balance
    let uCoins = coins[member.user.id].coins;
    let coinEmbed = new Discord.MessageEmbed()
      .setColor(roleColor)
      .setDescription(`${member.user.username}'s bal is: ${uCoins} 💰`)
      .setTimestamp()
      .setAuthor(member.user.username, member.user.displayAvatarURL());
    message.reply(coinEmbed);
  }
}