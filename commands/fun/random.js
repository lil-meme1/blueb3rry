const Discord = require("discord.js");
const MessageEmbed = require("discord.js");
module.exports = {
    name: "random",
    category: "fun",
    description: "generate a random number in the range given, default range 6",
    run: async (bot, message, args) => {

        let range;
        (isNaN(args[0]))? range = 6 : range = args[0];
        message.reply( Math.floor( Math.random() * range ) + 1 );

    }
}