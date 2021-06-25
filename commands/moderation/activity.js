const { GuildMemberRoleManager, Guild, Activity, Constants } = require("discord.js");
module.exports = {
    name: "activity",
    category: "moderation",
    description: "Sets the bots activity.",
    run: async (bot, message, args) => {

        if(args.length < 1){

            message.reply(`You can set the activities to ${Constants.ActivityTypes} and add a custom status to it.`);

        }else if(Constants.ActivityTypes.includes(args[0].toUpperCase())){

            var act = args[0].toUpperCase();
            args.shift();
            bot.user.setActivity(`${args.join(" ")}`, { type: act }).catch(console.error);

        }else{

            bot.user.setActivity(`${args.join(" ")}`, { type: 'WATCHING'}).catch(console.error);
            
        }
    }
}