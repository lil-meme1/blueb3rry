"use strict";

var _require = require("../../index.js"),
    bot = _require.bot;

var _require2 = require("../../functions.js"),
    getMember = _require2.getMember;

var _require3 = require("discord.js"),
    GuildMemberRoleManager = _require3.GuildMemberRoleManager,
    Guild = _require3.Guild,
    DiscordAPIError = _require3.DiscordAPIError,
    VoiceState = _require3.VoiceState;

module.exports = {
  name: "destroy",
  category: "moderation",
  description: "Shuts the bot down.",
  run: function run(bot, message, args) {
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //anton und olaf ID
            if (message.author.id === '192606825131147264' || message.author.id === '191276879876063233') {
              message.reply("Shutting down ".concat(bot.user.username)).then(function () {
                bot.user.setPresence({
                  acitvity: {
                    name: 'destroyed'
                  },
                  status: 'invisible'
                }).then(function () {
                  bot.destroy();
                });
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};