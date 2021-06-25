const Discord = require("discord.js");
const { getMember } = require("../../functions.js");
module.exports = {
    name: "id",
    category: "info",
    description: "Gets pinged users ID",
    run: async (bot, message, args) => {

        const member = getMember(message, args.join(" ")); 
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        //shows users ID as embed
        let uID = member.user.id;
        let idEmbed = new Discord.MessageEmbed()
            .setColor(roleColor)
            .setDescription(`${member.user.username}'s ID is: ${uID} 🎮`)
            .setTimestamp()
            .setAuthor(member.user.username, member.user.displayAvatarURL());
        message.reply(idEmbed);

    }
}