"use strict";

var _require = require("discord.js"),
    GuildMemberRoleManager = _require.GuildMemberRoleManager,
    Guild = _require.Guild;

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kicks first mentioned user",
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
              _context.next = 10;
              break;
            }

            if (msgmention) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            msgmention.kick().then(function (msgmention) {
              //Successmessage
              message.channel.send(":wave: " + msgmention.displayName + " has been successfully kicked");
            })["catch"](function (err) {
              //Failmessage                
              console.error(err);
              message.channel.send("Access Denied 🤏");
            });
            _context.next = 11;
            break;

          case 10:
            //Failmessage
            message.channel.send("Access Denied 🤏 You have no perms!");

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};