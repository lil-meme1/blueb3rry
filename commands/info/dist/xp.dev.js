"use strict";

var Discord = require("discord.js");

var MessageEmbed = require("discord.js");

var xp = require("./xp.json");

var _require = require("../../functions.js"),
    getMember = _require.getMember;

var fs = require('fs');

module.exports = {
  name: "xp",
  category: "info",
  description: "Tells you your or a users xp.",
  run: function run(bot, message, args) {
    var member, roleColor, uXp, xpEmbed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            member = getMember(message, args.join(" "));
            if (message.deletable) message["delete"]();
            roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor; //creates xp stat if none exists

            if (!xp[member.user.id]) {
              xp[member.user.id] = {
                xp: 0
              };
            } //sends an embed to channel to show xp


            uXp = xp[member.user.id].xp;
            xpEmbed = new Discord.MessageEmbed().setColor(roleColor).setDescription("".concat(member.user.username, "'s xp is: ").concat(uXp, " \u2728")).setTimestamp().setAuthor(member.user.username, member.user.displayAvatarURL());
            message.reply(xpEmbed);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};