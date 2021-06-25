module.exports = {
    name: "rules",
    category: "info",
    description: "Redirects user to #rules channel",
    run: async (bot, message, args) => {

        message.reply(`Check the rules at ${message.guild.channels.cache.find(ch => ch.name.toLowerCase() === `rules`)}`)   
          
    }
}