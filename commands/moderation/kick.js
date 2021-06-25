const { GuildMemberRoleManager, Guild } = require("discord.js");
module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks first mentioned user",
    run: async (bot, message, args) => {
        const idfk = '494141273922469920';
        const memster = '473206247299219456' ;
        const admin = '464078679136403457';

        var msgmention = message.mentions.members.first();
        if(message.member.roles.cache.has(idfk) === true || message.member.roles.cache.has(admin) === true || message.member.roles.cache.has(memster) === true){

            if(!msgmention) return;
            msgmention.kick().then((msgmention) => {

                //Successmessage
                message.channel.send(":wave: " + msgmention.displayName + " has been successfully kicked");

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