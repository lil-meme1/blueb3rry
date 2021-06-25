"use strict";

var _require = require("../../functions.js"),
    getMember = _require.getMember;

var _require2 = require("discord.js"),
    MessageEmbed = _require2.MessageEmbed;

var Discord = require('discord.js');

var bot = new Discord.Client();
module.exports = {
  name: "avatar",
  category: "info",
  description: "Retruns mentioned users Avatar",
  run: function run(bot, message, args) {
    var member, roleColor, embed, _embed;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            member = getMember(message, args.join(" "));
            roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

            if (!args[0]) {
              embed = new MessageEmbed().setTitle("Please specify which users avatar \nyou would like by pinging them.").setColor(roleColor).setTimestamp();
              message.reply(embed);
            } else {
              _embed = new MessageEmbed().setTitle("".concat(member.user.username, "s Profile picture:")).setURL(member.user.displayAvatarURL()).setImage(member.user.displayAvatarURL()).setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor).setDescription('Click the blue text to open image link.').setTimestamp();
              message.reply(_embed);
            }

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};