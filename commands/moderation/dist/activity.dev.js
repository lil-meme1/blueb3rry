"use strict";

var _require = require("discord.js"),
    GuildMemberRoleManager = _require.GuildMemberRoleManager,
    Guild = _require.Guild,
    Activity = _require.Activity,
    Constants = _require.Constants;

module.exports = {
  name: "activity",
  category: "moderation",
  description: "Sets the bots activity.",
  run: function run(bot, message, args) {
    var act;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (args.length < 1) {
              message.reply("You can set the activities to ".concat(Constants.ActivityTypes, " and add a custom status to it."));
            } else if (Constants.ActivityTypes.includes(args[0].toUpperCase())) {
              act = args[0].toUpperCase();
              args.shift();
              bot.user.setActivity("".concat(args.join(" ")), {
                type: act
              })["catch"](console.error);
            } else {
              bot.user.setActivity("".concat(args.join(" ")), {
                type: 'WATCHING'
              })["catch"](console.error);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};