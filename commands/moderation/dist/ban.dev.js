"use strict";

var _require = require("discord.js"),
    GuildMemberRoleManager = _require.GuildMemberRoleManager,
    Guild = _require.Guild;

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Bans first mentioned user for given days or perm",
  run: function run(bot, message, args) {
    var idfk, memster, admin, msgmention;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            idfk = '494141273922469920';
            memster = '473206247299219456';
            admin = '464078679136403457';
            msgmention = message.mentions.members.first();

            if (!(message.member.roles.cache.has(idfk) === true || message.member.roles.cache.has(admin) === true || message.member.roles.cache.has(memster) === true)) {
              _context.next = 13;
              break;
            }

            if (args[0]) {
              _context.next = 10;
              break;
            }

            message.channel.send("Please mention the user you would like to ban.");
            return _context.abrupt("return");

          case 10:
            if (!args[1]) {
              msgmention.ban().then(function (msgmention) {
                //Successmessage
                message.channel.send(":wave: " + msgmention.displayName + " has been successfully banned");
              })["catch"](function (err) {
                //Failmessage
                console.error(err);
                message.channel.send("Access Denied 🤏");
              });
              console.log(args[0] + " test");
            } else if (args[1]) {
              msgmention.ban({
                days: "".concat(args[1]),
                reason: "".concat(args[2])
              }).then(function (msgmention) {
                //Successmessage
                message.channel.send("\uD83D\uDC4B ".concat(msgmention.displayName, " has been successfully banned for ").concat(args[1], " days, reason: ").concat(args[2]));
              })["catch"](function (err) {
                //Failmessage
                console.error(err);
                message.channel.send("Access Denied 🤏");
              });
              console.log(args[1]);
            }

          case 11:
            _context.next = 14;
            break;

          case 13:
            //Failmessage
            message.channel.send("Access Denied 🤏 You have no perms!");

          case 14:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};