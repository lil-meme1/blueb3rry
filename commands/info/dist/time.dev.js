"use strict";

var Discord = require("discord.js"); //const MessageEmbed = require("discord.js");


var timeInVc = require("./timeInVc.json");

var _require = require("../../functions.js"),
    getMember = _require.getMember;

var fs = require('fs');

module.exports = {
  name: "time",
  category: "info",
  description: "Tells you your or a users time spent in VC.",
  run: function run(bot, message, args) {
    var member, roleColor, uTimeInVc, timeEmbed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            member = getMember(message, args.join(" "));
            if (message.deletable) message["delete"]();
            roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor; //creates timeInVc stat if none exists

            if (!timeInVc[member.user.id]) {
              timeInVc[member.user.id] = {
                timeInVc: 0
              };
            } //convert seconds(spent in VC) to a readable time


            secondsToHms = function secondsToHms(seconds) {
              if (seconds === 0) return '0 seconds';
              seconds = Number(seconds);
              var h = Math.floor(seconds / 3600);
              var m = Math.floor(seconds % 3600 / 60);
              var s = Math.floor(seconds % 3600 % 60);
              var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
              var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
              var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
              return hDisplay + mDisplay + sDisplay;
            }; //send embed to show the time spent in VC


            uTimeInVc = timeInVc[member.user.id].timeInVc;
            timeEmbed = new Discord.MessageEmbed().setColor(roleColor).setDescription("".concat(member.user.username, "'s time spent in voicechats is: ").concat(secondsToHms(uTimeInVc), " \u23F0")).setTimestamp().setAuthor(member.user.username, member.user.displayAvatarURL());
            message.reply(timeEmbed);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};