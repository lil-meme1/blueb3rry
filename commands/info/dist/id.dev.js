"use strict";

var Discord = require("discord.js");

var _require = require("../../functions.js"),
    getMember = _require.getMember;

module.exports = {
  name: "id",
  category: "info",
  description: "Gets pinged users ID",
  run: function run(bot, message, args) {
    var member, roleColor, uID, idEmbed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            member = getMember(message, args.join(" "));
            roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor; //shows users ID as embed

            uID = member.user.id;
            idEmbed = new Discord.MessageEmbed().setColor(roleColor).setDescription("".concat(member.user.username, "'s ID is: ").concat(uID, " \uD83C\uDFAE")).setTimestamp().setAuthor(member.user.username, member.user.displayAvatarURL());
            message.reply(idEmbed);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};