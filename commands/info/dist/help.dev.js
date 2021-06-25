"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["**", "** \n", ""], ["**", "** \\n", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("fs"),
    readdirSync = _require.readdirSync;

var fs = require('fs');

var _require2 = require("common-tags"),
    stripIndents = _require2.stripIndents;

var Discord = require('discord.js');

module.exports = {
  name: "help",
  category: "info",
  description: "Sends a list of all commands",
  run: function run(bot, message, args) {
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!args[0]) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", getCMD(bot, message, args[0]));

          case 4:
            return _context.abrupt("return", getAll(bot, message));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};

function getAll(bot, message) {
  var embed = new Discord.MessageEmbed().setColor(message.guild.me.displayHexColor);

  var commands = function commands(category) {
    return bot.commands.filter(function (cmd) {
      return cmd.category === category;
    }).map(function (cmd) {
      return "- `".concat(cmd.name, "`");
    }).join("\n");
  };

  var info = bot.categories.map(function (cat) {
    return stripIndents(_templateObject(), cat[0].toUpperCase() + cat.slice(1), commands(cat));
  }).reduce(function (string, category) {
    return string + "\n" + category;
  });
  return message.channel.send(embed.setDescription(info));
}

function getCMD(bot, message, input) {
  var embed = new Discord.MessageEmbed();
  var cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));
  var info = "No information found **".concat(input.toLowerCase(), "**");

  if (!cmd) {
    return message.channel.send(embed.setColor("RED").setDescription(info));
  }

  if (cmd.name) info = "**Command name:** ".concat(cmd.name);
  if (cmd.aliases) info += "\n**Aliases:** ".concat(cmd.aliases.map(function (a) {
    return "`".concat(a, "`");
  }).join(", "));
  if (cmd.description) info += "\n**Description:** ".concat(cmd.description);

  if (cmd.usage) {
    info += "\n**Usage:** ".concat(cmd.usage);
    embed.setFooter("Syntax: <> = required, [] optional");
  }

  return message.channel.send(embed.setColor("GREEN").setDescription(info));
}