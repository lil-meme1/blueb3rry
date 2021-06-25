"use strict";

var Discord = require("discord.js");

var MessageEmbed = require("discord.js");

var coins = require("./coins.json");

var _require = require("../../functions.js"),
    getMember = _require.getMember;

var fs = require('fs');

module.exports = {
  name: "bal",
  category: "info",
  description: "Tells you your currency balance",
  run: function run(bot, message, args) {
    var member, roleColor, uCoins, coinEmbed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            member = getMember(message, args.join(" "));
            if (message.deletable) message["delete"]();
            roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor; //creates coin data if none is found

            if (!coins[member.user.id]) {
              coins[member.user.id] = {
                coins: 0
              };
            } //shows users coin balance


            uCoins = coins[member.user.id].coins;
            coinEmbed = new Discord.MessageEmbed().setColor(roleColor).setDescription("".concat(member.user.username, "'s bal is: ").concat(uCoins, " \uD83D\uDCB0")).setTimestamp().setAuthor(member.user.username, member.user.displayAvatarURL());
            message.reply(coinEmbed);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};