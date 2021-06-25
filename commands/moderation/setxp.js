const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
let xp = require(`../../commands/info/xp.json`);
const fs = require('fs');
const { getMember } = require("../../functions.js");
module.exports = {
    name: "setxp",
    category: "moderation",
    description: "Sets the mentioned users xp to a given amount",
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(" "));
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
        var msgmention = message.mentions.members.first();
        
        const idfk = '494141273922469920';
        const memster = '473206247299219456' ;
        const admin = '464078679136403457';

        if(!xp[msgmention.id]){

            xp[msgmention.id]= {
                xp: 0
            };

        }

        if(message.member.roles.cache.has(idfk) === true || message.member.roles.cache.has(admin) === true || message.member.roles.cache.has(memster) === true){
            if(!args[0]){

                message.reply("Please mention a user you would like to set the xp of.");

            }else if (!args[1]){

                message.reply(`Please add what amount you would like to set ${member}'s xp to.`);

            }else if(isNaN(args[1]) === true){

                message.reply(`Please only set xp to a number value.`);

            }else if(args[0] && args[1]){

                xp[msgmention.id].xp = Math.floor(args[1]);
                message.channel.send(`Success, ${member}'s xp have been set to ${xp[msgmention.id].xp}`)

            }else
            return
        }else
        message.channel.send("Access Denied 🤏 You have no perms!")
    }
}