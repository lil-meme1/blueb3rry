"use strict";

var Discord = require("discord.js");

var _require = require("../../functions.js"),
    getMember = _require.getMember;

module.exports = {
  name: "move",
  category: "moderation",
  description: "Moves member or voice channels into other voice channels.",
  run: function run(bot, message, args) {
    var seconds, voiceChannels, voiceChannelsId, guildMembers, target, getDestination, dragTo;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dragTo = function _ref2(target, destination) {
              console.log("dragTo target(s): ".concat(target, " \ndragTo destination: ").concat(destination));
            };

            getDestination = function _ref() {
              var voiceStates = message.channel.guild.voiceStates.cache; //find member by ID

              var member = guildMembers.some(function (m) {
                return m.id === args[1];
              }) ? guildMembers.find(function (m) {
                return m.id === args[1];
              }) : null; //find member by PING / @TAG

              if (member === null) member = guildMembers.some(function (m) {
                return "<@!".concat(m.id, ">") === args[1];
              }) ? guildMembers.find(function (m) {
                return "<@!".concat(m.id, ">") === args[1];
              }) : null;

              if (member != null) {
                console.log('user as destionation.');
              } //find channel by ID | ch = channel ( avoid interference with const let channel )


              var channel = voiceChannelsId.some(function (id) {
                return id === args[1];
              }) ? voiceChannels.find(function (ch) {
                return ch.id === args[1];
              }) : null; //find channel by PING | ch = channel ( avoid interference with const let channel )

              if (channel === null) channel = voiceChannelsId.some(function (id) {
                return "<#".concat(id, ">") === args[1];
              }) ? voiceChannels.find(function (ch) {
                return "<#".concat(ch.id, ">") === args[1];
              }) : null;

              if (channel != null) {
                console.log('channel as destination.');
              }
            };

            seconds = 5; //collection of all voice channels

            voiceChannels = message.member.guild.channels.cache.filter(function (channel) {
              return channel.type === 'voice';
            }); //array of all voice channel ids

            voiceChannelsId = [];
            voiceChannels != null ? voiceChannels.each(function (channel) {
              return voiceChannelsId.push(channel.id);
            }) : null; //cache of every guild member to be used

            guildMembers = message.guild.members.cache; //let target = getTarget();
            //let destination = getDestination();
            //execute move of members to channel
            //dragTo(target,destination);
            //TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET
            //empty array to await IDs of targets to be moved

            target = [];
            message.channel.awaitMessages(function (m) {
              return m.author.id === message.author.id;
            }, {
              max: 1,
              time: seconds * 1000
            }).then(function (collected) {
              //shorten parameters in 1-liners
              var collectContent = collected.first().content; //find user by ID | m = member ( avoid interference with let member )

              var member = guildMembers.some(function (m) {
                return m.id === collectContent;
              }) ? guildMembers.find(function (m) {
                return m.id === collectContent;
              }) : null; //find user by PING / @TAG

              if (member === null) member = guildMembers.some(function (m) {
                return "<@!".concat(m.id, ">") === collectContent;
              }) ? guildMembers.find(function (m) {
                return "<@!".concat(m.id, ">") === collectContent;
              }) : null; //user found as a target

              if (member != null) {
                message.reply("Member found: ".concat(member)); //if user is in VC

                var isInVc = member.voice.channel.type === 'voice' ? true : false; //ERROR, user to be moved is not in a voice channel

                if (!isInVc) return message.reply("target user ".concat(member.user.username, " is not in a voice channel"));
                return target.push(member);
              } //find channel by ID | ch = channel ( avoid interference with const let channel )


              var channel = voiceChannelsId.some(function (id) {
                return id === collectContent;
              }) ? voiceChannels.find(function (ch) {
                return ch.id === collectContent;
              }) : null; //find channel by PING | ch = channel ( avoid interference with const let channel )

              if (channel === null) channel = voiceChannelsId.some(function (id) {
                return "<#".concat(id, ">") === collectContent;
              }) ? voiceChannels.find(function (ch) {
                return "<#".concat(ch.id, ">") === collectContent;
              }) : null; //channel found as a target

              if (channel != null) {
                var membersMap = channel.members.map(function (user) {
                  return user;
                }); //ERROR, no users connected to voice channel

                if (membersMap.size != 0) return message.reply("".concat(channel.name, " has no members to be moved.")); //members of channel as targets

                channel.members.each(function (member) {
                  return target.push(member);
                });
                var msgAppend = "Targets in channel: ";
                target.forEach(function (u) {
                  msgAppend.concat("".concat(u.user.username, " , \n"));
                });
                return target;
              }
            })["catch"](function (error) {
              message.reply("No respond.. ".concat(seconds, " seconds, aborting move command."));
            }); //DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION
            //destination to be moved to

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  }
}; //const voiceChannel = message.guild.channels.cache.find(channel => channel.id === voiceChannelId);