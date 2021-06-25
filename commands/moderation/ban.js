const { GuildMemberRoleManager, Guild } = require("discord.js");
module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans first mentioned user for given days or perm",
    run: async (bot, message, args) => {
        const idfk = '494141273922469920';
        const memster = '473206247299219456' ;
        const admin = '464078679136403457';
        var msgmention = message.mentions.members.first();
        
        if(message.member.roles.cache.has(idfk) === true || message.member.roles.cache.has(admin) === true || message.member.roles.cache.has(memster) === true){

            if(!args[0]){

                message.channel.send("Please mention the user you would like to ban.")
                return

            }else if(!args[1]){

                msgmention.ban().then((msgmention) => {
                    
                    //Successmessage
                    message.channel.send(":wave: " + msgmention.displayName + " has been successfully banned");

                }).catch((err) => {

                    //Failmessage
                    console.error(err);
                    message.channel.send("Access Denied 🤏");

                });

                console.log(args[0] + " test");

            }else if(args[1]){    

                msgmention.ban({ days: `${args[1]}`, reason: `${args[2]}`}).then((msgmention) => {
                    
                    //Successmessage
                    message.channel.send(`👋 ${msgmention.displayName} has been successfully banned for ${args[1]} days, reason: ${args[2]}`);

                }).catch((err) => {

                    //Failmessage
                    console.error(err);
                    message.channel.send("Access Denied 🤏");

                });

                console.log(args[1]);

            }
        }else{

            //Failmessage
            message.channel.send("Access Denied 🤏 You have no perms!");
            
        }
    }
}