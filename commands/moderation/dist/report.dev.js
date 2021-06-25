"use strict";

module.exports = {
  name: "report",
  category: "moderation",
  description: "Lets user know to contact staff LOL",
  run: function run(bot, message, args) {
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (args.length < 1) message.reply('pussy boy');

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};