"use strict";

var Discord = require("discord.js");

var MessageEmbed = require("discord.js");

module.exports = {
  name: "random",
  category: "fun",
  description: "generate a random number in the range given, default range 6",
  run: function run(bot, message, args) {
    var range;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isNaN(args[0]) ? range = 6 : range = args[0];
            message.reply(Math.floor(Math.random() * range) + 1);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};