const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
let xp = require(`./xp.json`);
const { getMember } = require("../../functions.js");
const fs = require('fs');
module.exports = {
  name: "xp",
  category: "info",
  description: "Tells you your or a users xp.",
  run: async (bot, message, args) => {
    const member = getMember(message, args.join(" "));
    if(message.deletable) message.delete();
    const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
    
    //creates xp stat if none exists
    if(!xp[member.user.id]){

      xp[member.user.id]= {
        xp: 0
      };

    }

    //sends an embed to channel to show xp
    let uXp = xp[member.user.id].xp;
    let xpEmbed = new Discord.MessageEmbed()
      .setColor(roleColor)
      .setDescription(`${member.user.username}'s xp is: ${uXp} ✨`)
      .setTimestamp()
      .setAuthor(member.user.username, member.user.displayAvatarURL());
    message.reply(xpEmbed);

  }
}