const { getMember } = require("../../functions.js");
const { formatDate } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const bot = new Discord.Client();
const { stripIndents } = require("common-tags");

module.exports = {
    name: "whois",
    category: "info",
    description: "Information about user",
    run: async (bot, message, args) => {

        const member = getMember(message, args.join(" "));

        //Member variables
        const joined = formatDate(member.joinedAt);

        //User variables
        const created = formatDate(member.user.createdAt);
 
        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.avatarURL())
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

            .addField('**Member Information**', stripIndents`** Display name:**\n${member.displayName}\n
            ** Joined at:**\n${joined}\n
            ** Roles:**\n${Array.from(member.roles.cache.values()).filter(role => role != member.guild.roles.everyone).join(" ")}\n
            Dates are in (MM/DD/YYYY)`, true)

            .addField('**User Information**', stripIndents`** ID:**\n${member.user.id}\n
            ** Username:**\n ${member.user.username}\n
            ** Discord Tag:**\n${member.user.tag}\n
            ** Created at:**\n ${created}`, true)
            .setTimestamp()

        if(member.user.presence.game)
            embed.addField('Currently playing', `**> Name:** ${member.user.presence.game.name}`);
            message.channel.send(embed);
            
    }
}