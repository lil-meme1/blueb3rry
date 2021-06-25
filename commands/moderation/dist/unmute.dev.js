"use strict";

var _require = require("../../functions.js"),
    getMember = _require.getMember;

var _require2 = require("discord.js"),
    GuildMemberRoleManager = _require2.GuildMemberRoleManager,
    Guild = _require2.Guild,
    DiscordAPIError = _require2.DiscordAPIError,
    VoiceState = _require2.VoiceState;

module.exports = {
  name: "unmute",
  category: "moderation",
  description: "mutes user in voice and text channels",
  run: function run(bot, message, args) {
    var idfk, memster, admin, msgmention;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            idfk = '494141273922469920';
            memster = '473206247299219456';
            admin = '464078679136403457';
            msgmention = message.mentions.members.first();

            if (!(message.member.roles.cache.has(idfk) || message.member.roles.cache.has(admin) || message.member.roles.cache.has(memster))) {
              _context.next = 10;
              break;
            }

            if (msgmention) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            msgmention.roles.remove(msgmention.guild.roles.cache.find(function (role) {
              return role.name === 'Mute🔇';
            })).then(function (msgmention) {
              //Successmessage
              if (!msgmention.voice.channel) {
                message.channel.send("🔊 " + msgmention.displayName + " has been successfully unmuted");
              } else {
                var currentChannel = msgmention.voice.channel;
                msgmention.voice.setChannel(msgmention.guild.channels.cache.get('name', '.')).then(msgmention.voice.setChannel(currentChannel));
                message.channel.send("🔊 " + msgmention.displayName + " has been successfully unmuted");
              }
            })["catch"](function (err) {
              //Failmessage
              console.error(err);
              message.channel.send("Access Denied 🤏");
            });
            _context.next = 11;
            break;

          case 10:
            //Failmessage
            message.channel.send("Access Denied 🤏 You have no perms!");

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};