const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");
module.exports = {
    name: "find",
    category: "moderation",
    description: "Looks for a user in voice chats.",
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(" "));

        //filter out bot ping
        if(member === bot){
            const noUserEmbed = new MessageEmbed()
                .setTitle(`Please don't ping the bot.`)
                .setDescription('Please only ping users.')
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                .setTimestamp();
            message.reply(noUserEmbed)
            return
        }

        //if user is not in a channel
        if(member.voice.channel === null){
            const noUserEmbed = new MessageEmbed()
                .setTitle(`Couldn't find "${member.user.username}" in any voice channel`)
                .setDescription('User is not in a channel')
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                .setTimestamp();
            message.reply(noUserEmbed)
            return
        };

        //usefull variables
        const voiceChannelId = (member.voice.channel.type === 'voice') ? member.voice.channel.id : null;
        const voiceChannel = message.guild.channels.cache.find(channel => channel.id === voiceChannelId);

        //create invite based on object and string concactination
        voiceChannel.createInvite().then(invite => {
            const inviteLink = `https://discord.gg/${invite.code}`;
    
            const embed = new MessageEmbed()
                .setTitle(`Found "${member.user.username}" in: ${voiceChannel.name}`)
                .setDescription(`\[Click here to join!\]\(${inviteLink}\)`)
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                .setTimestamp();
            message.reply(embed);
        })
    }
}