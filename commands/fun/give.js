const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
let coins = require(`../../commands/info/coins.json`);
const { getMember } = require("../../functions.js");
module.exports = {
    name: "give",
    category: "fun",
    description: "Gives a user coins",
  run: async (bot, message, args) => {
    const member = getMember(message, args.join(" "));
    const x = args[1];

    if(!args[0]){

        message.reply("Please specify a user you would like to give money to.")

    }else if(!args[1]){

        message.reply(`Please specify the amount of money you would like to give to ${member.displayName}.`)

    }else if(coins[message.author.id].coins - x >= 0){

        coins[message.author.id].coins = coins[message.author.id].coins - x;
        coins[member.id].coins = Math.floor(coins[member.id].coins) + Math.floor(x);

        let uCoins = coins[member.id].coins;
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
        let coinEmbed = new Discord.MessageEmbed()
            .setColor(roleColor)
            .setDescription(`${member.user.username} s bal is: ${uCoins} 💰`)
            .setTimestamp()
            .setAuthor(member.displayName, member.user.displayAvatarURL());
        message.reply(coinEmbed).then(msg => {msg.delete({ timeout : 60000})});

    }else{

        message.channel.send("You don't have enough money! 💰");
        return
        
    }
  }
}