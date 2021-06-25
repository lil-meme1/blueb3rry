const Discord = require("discord.js");
//const MessageEmbed = require("discord.js");
let timeInVc = require(`./timeInVc.json`);
const { getMember } = require("../../functions.js");
const fs = require('fs');
module.exports = {
    name: "time",
    category: "info",
    description: "Tells you your or a users time spent in VC.",
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(" "));
        if(message.deletable) message.delete();
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
        
        //creates timeInVc stat if none exists
        if(!timeInVc[member.user.id]){

            timeInVc[member.user.id]= {
                timeInVc: 0
            };
  
        }
        
        //convert seconds(spent in VC) to a readable time
        secondsToHms = (seconds) => {

            if(seconds === 0) return '0 seconds';

            seconds = Number(seconds);
            var h = Math.floor(seconds / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 3600 % 60);
        
            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

            return hDisplay + mDisplay + sDisplay; 
        }
        
        //send embed to show the time spent in VC
        let uTimeInVc = timeInVc[member.user.id].timeInVc;
        let timeEmbed = new Discord.MessageEmbed()
            .setColor(roleColor)
            .setDescription(`${member.user.username}'s time spent in voicechats is: ${secondsToHms(uTimeInVc)} ⏰`)
            .setTimestamp()
            .setAuthor(member.user.username, member.user.displayAvatarURL());
        message.reply(timeEmbed);

    }
}