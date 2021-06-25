"use strict";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["** ID:**\n", "\n\n            ** Username:**\n ", "\n\n            ** Discord Tag:**\n", "\n\n            ** Created at:**\n ", ""], ["** ID:**\\n", "\\n\n            ** Username:**\\n ", "\\n\n            ** Discord Tag:**\\n", "\\n\n            ** Created at:**\\n ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["** Display name:**\n", "\n\n            ** Joined at:**\n", "\n\n            ** Roles:**\n", "\n\n            Dates are in (MM/DD/YYYY)"], ["** Display name:**\\n", "\\n\n            ** Joined at:**\\n", "\\n\n            ** Roles:**\\n", "\\n\n            Dates are in (MM/DD/YYYY)"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("../../functions.js"),
    getMember = _require.getMember;

var _require2 = require("../../functions.js"),
    formatDate = _require2.formatDate;

var _require3 = require("discord.js"),
    MessageEmbed = _require3.MessageEmbed;

var Discord = require('discord.js');

var bot = new Discord.Client();

var _require4 = require("common-tags"),
    stripIndents = _require4.stripIndents;

module.exports = {
  name: "whois",
  category: "info",
  description: "Information about user",
  run: function run(bot, message, args) {
    var member, joined, created, embed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            member = getMember(message, args.join(" ")); //Member variables

            joined = formatDate(member.joinedAt); //User variables

            created = formatDate(member.user.createdAt);
            embed = new MessageEmbed().setFooter(member.displayName, member.user.displayAvatarURL).setThumbnail(member.user.avatarURL()).setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor).addField('**Member Information**', stripIndents(_templateObject(), member.displayName, joined, Array.from(member.roles.cache.values()).filter(function (role) {
              return role != member.guild.roles.everyone;
            }).join(" ")), true).addField('**User Information**', stripIndents(_templateObject2(), member.user.id, member.user.username, member.user.tag, created), true).setTimestamp();
            if (member.user.presence.game) embed.addField('Currently playing', "**> Name:** ".concat(member.user.presence.game.name));
            message.channel.send(embed);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};