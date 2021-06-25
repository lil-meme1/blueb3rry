const { bot } = require("../../index.js");
const { getMember } = require("../../functions.js");
const { GuildMemberRoleManager, Guild, DiscordAPIError, VoiceState } = require("discord.js");
module.exports = {
    name: "destroy",
    category: "moderation",
    description: "Shuts the bot down.",
    run: async (bot, message, args) => {
        
        //anton und olaf ID
        if(message.author.id === '192606825131147264' || message.author.id === '191276879876063233'){

            message.reply(`Shutting down ${bot.user.username}`).then( () => {
                bot.user.setPresence({ acitvity: { name: 'destroyed' }, status: 'invisible'}).then( () => {

                    bot.destroy();

                });
            });
            
        }
    }
}