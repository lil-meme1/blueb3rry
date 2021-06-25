"use strict";

var Discord = require('discord.js');

var MessageEmbed = require("discord.js");

module.exports = {
  name: "slotrndm",
  category: "fun",
  description: "Free symbol Slot machine",
  run: function run(bot, message, args) {
    var fruit, roleColor, embed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fruit = new Array('🍌', '🍋', '🍓', '🍒', '🍇', '🍉', '🍌', '🍋');
            roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
            embed = new Discord.MessageEmbed().setColor(roleColor).setDescription("\n" + fruit[Math.floor(Math.random() * (fruit.length - 2)) + 1] + ' | ' + fruit[Math.floor(Math.random() * (fruit.length - 2)) + 1] + ' | ' + fruit[Math.floor(Math.random() * (fruit.length - 2)) + 1] + "\n" + fruit[Math.floor(Math.random() * (fruit.length - 2)) + 1] + ' | ' + fruit[Math.floor(Math.random() * (fruit.length - 2)) + 1] + ' | ' + fruit[Math.floor(Math.random() * (fruit.length - 2)) + 1] + "\n" + //winning lane
            fruit[Math.floor(Math.random() * (fruit.length - 2)) + 1] + ' | ' + fruit[Math.floor(Math.random() * (fruit.length - 2)) + 1] + ' | ' + fruit[Math.floor(Math.random() * (fruit.length - 2)) + 1]).setTimestamp().setAuthor(message.author.username, message.author.displayAvatarURL());
            message.reply(embed);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};