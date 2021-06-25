"use strict";

var Discord = require("discord.js");

var MessageEmbed = require("discord.js");

module.exports = {
  name: "date",
  category: "info",
  description: "Tells you the current date.",
  run: function run(bot, message, args) {
    var currDate, embed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //var currDate = new Date().toJSON().slice(0,10).replace(/-/g,'');
            currDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            embed = new Discord.MessageEmbed();
            embed.setColor("0x00ff00");
            embed.setTitle(currDate);
            message.channel.send(embed);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};