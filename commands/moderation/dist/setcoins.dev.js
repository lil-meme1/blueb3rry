"use strict";

var Discord = require("discord.js");

var MessageEmbed = require("discord.js");

var coins = require("../../commands/info/coins.json");

var _require = require("../../functions.js"),
    getMember = _require.getMember;

module.exports = {
  name: "setcoins",
  category: "moderation",
  description: "Sets the mentioned users coins to a given amount",
  run: function run(bot, message, args) {
    var member, roleColor, msgmention, idfk, memster, admin;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            member = getMember(message, args.join(" "));
            roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
            msgmention = message.mentions.members.first();
            idfk = '494141273922469920';
            memster = '473206247299219456';
            admin = '464078679136403457';

            if (!coins[msgmention.id]) {
              coins[msgmention.id] = {
                coins: 0
              };
            }

            if (!(message.member.roles.cache.has(idfk) === true || message.member.roles.cache.has(admin) === true || message.member.roles.cache.has(memster) === true)) {
              _context.next = 28;
              break;
            }

            if (args[0]) {
              _context.next = 12;
              break;
            }

            message.reply("Please mention a user you would like to set the coins of.");
            _context.next = 26;
            break;

          case 12:
            if (args[1]) {
              _context.next = 16;
              break;
            }

            message.reply("Please add what amount you would like to set ".concat(member, "'s coins to."));
            _context.next = 26;
            break;

          case 16:
            if (!(isNaN(args[1]) === true)) {
              _context.next = 20;
              break;
            }

            message.reply("Please only set coins to a number value.");
            _context.next = 26;
            break;

          case 20:
            if (!(args[0] && args[1])) {
              _context.next = 25;
              break;
            }

            coins[msgmention.id].coins = Math.floor(args[1]);
            message.channel.send("Success, ".concat(member, "'s coins have been set to ").concat(coins[msgmention.id].coins));
            _context.next = 26;
            break;

          case 25:
            return _context.abrupt("return");

          case 26:
            _context.next = 29;
            break;

          case 28:
            message.channel.send("Access Denied 🤏 You have no perms!");

          case 29:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};