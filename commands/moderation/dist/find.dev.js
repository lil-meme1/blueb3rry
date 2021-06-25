"use strict";

var Discord = require("discord.js");

var _require = require("discord.js"),
    MessageEmbed = _require.MessageEmbed;

var _require2 = require("../../functions.js"),
    getMember = _require2.getMember;

module.exports = {
  name: "find",
  category: "moderation",
  description: "Looks for a user in voice chats.",
  run: function run(bot, message, args) {
    var member, noUserEmbed, _noUserEmbed, voiceChannelId, voiceChannel;

    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            member = getMember(message, args.join(" ")); //filter out bot ping

            if (!(member === bot)) {
              _context.next = 5;
              break;
            }

            noUserEmbed = new MessageEmbed().setTitle("Please don't ping the bot.").setDescription('Please only ping users.').setThumbnail(member.user.displayAvatarURL()).setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor).setTimestamp();
            message.reply(noUserEmbed);
            return _context.abrupt("return");

          case 5:
            if (!(member.voice.channel === null)) {
              _context.next = 9;
              break;
            }

            _noUserEmbed = new MessageEmbed().setTitle("Couldn't find \"".concat(member.user.username, "\" in any voice channel")).setDescription('User is not in a channel').setThumbnail(member.user.displayAvatarURL()).setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor).setTimestamp();
            message.reply(_noUserEmbed);
            return _context.abrupt("return");

          case 9:
            ; //usefull variables

            voiceChannelId = member.voice.channel.type === 'voice' ? member.voice.channel.id : null;
            voiceChannel = message.guild.channels.cache.find(function (channel) {
              return channel.id === voiceChannelId;
            }); //create invite based on object and string concactination

            voiceChannel.createInvite().then(function (invite) {
              var inviteLink = "https://discord.gg/".concat(invite.code);
              var embed = new MessageEmbed().setTitle("Found \"".concat(member.user.username, "\" in: ").concat(voiceChannel.name)).setDescription("[Click here to join!](".concat(inviteLink, ")")).setThumbnail(member.user.displayAvatarURL()).setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor).setTimestamp();
              message.reply(embed);
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};