"use strict";

var Discord = require("discord.js");

var _require = require("../../functions.js"),
    getMember = _require.getMember;

var _require2 = require('discord-buttons'),
    MessageButton = _require2.MessageButton,
    MessageActionRow = _require2.MessageActionRow;

module.exports = {
  name: "test3",
  category: "moderation",
  description: "command to test stuff",
  run: function run(bot, message, args) {
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};