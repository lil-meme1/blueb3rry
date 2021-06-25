const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
let coins = require(`../../commands/info/coins.json`);
const { getMember } = require("../../functions.js");
module.exports = {
    name: "setcoins",
    category: "moderation",
    description: "Sets the mentioned users coins to a given amount",
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(" "));
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
        var msgmention = message.mentions.members.first();
        
        const idfk = '494141273922469920';
        const memster = '473206247299219456' ;
        const admin = '464078679136403457';

        if(!coins[msgmention.id]){
            coins[msgmention.id]= {
              coins: 0
            };
        }

        if(message.member.roles.cache.has(idfk) === true || message.member.roles.cache.has(admin) === true || message.member.roles.cache.has(memster) === true){

            if(!args[0]){

                message.reply("Please mention a user you would like to set the coins of.");

            }else if (!args[1]){
                
                message.reply(`Please add what amount you would like to set ${member}'s coins to.`);

            }else if(isNaN(args[1]) === true){
                
                message.reply(`Please only set coins to a number value.`);

            }else if(args[0] && args[1]){
                
                coins[msgmention.id].coins = Math.floor(args[1]);
                message.channel.send(`Success, ${member}'s coins have been set to ${coins[msgmention.id].coins}`)

            }else
            return
        }else

        message.channel.send("Access Denied 🤏 You have no perms!")
        
    }
}