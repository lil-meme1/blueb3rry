"use strict";

module.exports = {
  name: "rules",
  category: "info",
  description: "Redirects user to #rules channel",
  run: function run(bot, message, args) {
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message.reply("Check the rules at ".concat(message.guild.channels.cache.find(function (ch) {
              return ch.name.toLowerCase() === "rules";
            })));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};