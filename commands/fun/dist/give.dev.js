"use strict";

var Discord = require("discord.js");

var MessageEmbed = require("discord.js");

var coins = require("../../commands/info/coins.json");

var _require = require("../../functions.js"),
    getMember = _require.getMember;

module.exports = {
  name: "give",
  category: "fun",
  description: "Gives a user coins",
  run: function run(bot, message, args) {
    var member, x, uCoins, roleColor, coinEmbed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            member = getMember(message, args.join(" "));
            x = args[1];

            if (args[0]) {
              _context.next = 6;
              break;
            }

            message.reply("Please specify a user you would like to give money to.");
            _context.next = 21;
            break;

          case 6:
            if (args[1]) {
              _context.next = 10;
              break;
            }

            message.reply("Please specify the amount of money you would like to give to ".concat(member.displayName, "."));
            _context.next = 21;
            break;

          case 10:
            if (!(coins[message.author.id].coins - x >= 0)) {
              _context.next = 19;
              break;
            }

            coins[message.author.id].coins = coins[message.author.id].coins - x;
            coins[member.id].coins = Math.floor(coins[member.id].coins) + Math.floor(x);
            uCoins = coins[member.id].coins;
            roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
            coinEmbed = new Discord.MessageEmbed().setColor(roleColor).setDescription("".concat(member.user.username, " s bal is: ").concat(uCoins, " \uD83D\uDCB0")).setTimestamp().setAuthor(member.displayName, member.user.displayAvatarURL());
            message.reply(coinEmbed).then(function (msg) {
              msg["delete"]({
                timeout: 60000
              });
            });
            _context.next = 21;
            break;

          case 19:
            message.channel.send("You don't have enough money! 💰");
            return _context.abrupt("return");

          case 21:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};