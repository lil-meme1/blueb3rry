const { getMember } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: "avatar",
    category: "info",
    description: "Retruns mentioned users Avatar",
    run: async (bot, message, args) => {

        const member = getMember(message, args.join(" "));
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        if(!args[0]){

            const embed = new MessageEmbed()
                .setTitle("Please specify which users avatar \nyou would like by pinging them.")
                .setColor(roleColor)
                .setTimestamp()
            message.reply(embed)

        }else{

            const embed = new MessageEmbed()
                .setTitle(`${member.user.username}s Profile picture:`)
                .setURL(member.user.displayAvatarURL())
                .setImage(member.user.displayAvatarURL())
                .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                .setDescription('Click the blue text to open image link.')
                .setTimestamp();
            message.reply(embed);
            
        }
    }
}