const { getMember } = require("../../functions.js");
const { GuildMemberRoleManager, Guild, DiscordAPIError, VoiceState } = require("discord.js");
module.exports = {
    name: "mute",
    category: "moderation",
    description: "mutes user in voice and text channels",
    run: async (bot, message, args) => {
        const idfk = '494141273922469920';
        const memster = '473206247299219456' ;
        const admin = '464078679136403457';

        var msgmention = message.mentions.members.first();

        if(message.member.roles.cache.has(idfk) || message.member.roles.cache.has(admin) || message.member.roles.cache.has(memster)){

            if(!msgmention) return;
            msgmention.roles.add(msgmention.guild.roles.cache.find(role => role.name === 'Mute🔇')).then((msgmention) => {

                //Successmessage
                if(!msgmention.voice.channel){

                    message.channel.send("🤐 " + msgmention.displayName + " has been successfully muted");

                }else{

                    const currentChannel = msgmention.voice.channel;  
                    msgmention.voice.setChannel(msgmention.guild.channels.cache.get('name','.')).then(msgmention.voice.setChannel(currentChannel));
                    message.channel.send("🤐 " + msgmention.displayName + " has been successfully muted");

                }
                
            }).catch((err) => {

                //Failmessage
                console.error(err);
                message.channel.send("Access Denied 🤏");

            }); 

        }else{

            //Failmessage
            message.channel.send("Access Denied 🤏 You have no perms!");

        }
    }
}