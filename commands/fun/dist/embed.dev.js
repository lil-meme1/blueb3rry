"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Discord = require('discord.js');

var fs = require('fs');

var MessageEmbed = require("discord.js");

var _require = require('path'),
    resolve = _require.resolve;

var _require2 = require('assert'),
    rejects = _require2.rejects;

module.exports = {
  name: "embed",
  category: "fun",
  description: "Embeds your message, allows you to create custom embeds",
  run: function run(bot, message, args) {
    var filter, roleColor, time, customEmbed, customMessage, awaited, awaitedArr, commandOptions, valueText, optionsEmbed, embed;
    return regeneratorRuntime.async(function run$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filter = function filter(m) {
              return m.author.id === message.author.id;
            };

            roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor; //check if embed should be custom

            if (!(args.length >= 1 && args[0].toString().toLowerCase() === "custom")) {
              _context5.next = 14;
              break;
            }

            //custom embed
            time = 10000;
            customEmbed = new Discord.MessageEmbed();
            //array of command options the user can choose from
            commandOptions = {
              "!setColor [hexCode or R G B ]": "1️⃣",
              "!setTitle [String]": "2️⃣",
              "!setTitlelink [URL]": "3️⃣",
              "!setDescription [String]": "4️⃣",
              "!addTimestamp [toggle]": "5️⃣",
              "!setAuthor [@Mention]": "6️⃣",
              "!setThumbnail [URL]": "7️⃣",
              "!addField [String(title), String(value), Boolean(inline)]": "8️⃣",
              "!setImage [URL]": "9️⃣"
            }; //valueText

            valueText = "";

            for (obj in commandOptions) {
              valueText = "".concat(valueText, " \n").concat(commandOptions[obj], " ").concat(obj);
            }

            ; //embed to visualize settings to choose from and which have been chosen allready

            optionsEmbed = new Discord.MessageEmbed().setColor(roleColor).setTitle('Custom embed creator').setDescription('allows you to choose options to add to an embed, then send said embed.').addFields({
              name: 'Options',
              value: "".concat(valueText)
            }).setFooter('Choose an option to add to the embed', 'https://cdn.discordapp.com/attachments/792859607713185812/792860389674451004/2.png'); //lets user know that messages are being awaited and when it ends

            _context5.next = 12;
            return regeneratorRuntime.awrap(message.channel.send(optionsEmbed).then(function _callee3(msg) {
              var reactions, addReactions;
              return regeneratorRuntime.async(function _callee3$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      addReactions = function _ref(message, reactions) {
                        return regeneratorRuntime.async(function addReactions$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                message.react(reactions[0]);
                                reactions.shift();

                                if (reactions.length > 0) {
                                  setTimeout(function () {
                                    return addReactions(message, reactions);
                                  }, 500);
                                }

                              case 3:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      };

                      //add reactions according to 
                      reactions = Object.values(commandOptions);
                      ;
                      addReactions(msg, reactions).then(function _callee2() {
                        return regeneratorRuntime.async(function _callee2$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                _context3.next = 2;
                                return regeneratorRuntime.awrap(message.channel.send("\n<@".concat(message.author.id, "> Please specify embed options now: [time = ").concat(time / 1000, " s]\nCurrent Embed: \n"), customEmbed).then(function _callee(msgCustom) {
                                  var bool, boolErr, cmdOption, awaitedCommandArgs, awaitedArgs, charArr, newValue, charInHex, numInHex, rgbtohex;
                                  return regeneratorRuntime.async(function _callee$(_context2) {
                                    while (1) {
                                      switch (_context2.prev = _context2.next) {
                                        case 0:
                                          bool = false;
                                          console.log('infront of while');

                                          while (bool = false) {
                                            //wait for react to embed  
                                            bot.on('messageReactionAdd', function (react, user) {
                                              console.log('add');
                                              console.log("emoji: ".concat(react().emoji.toString()));

                                              if (Object.values(commandOptions).some() === react().emoji.toString()) {
                                                console.log('react collected');
                                                bool = true;
                                              }
                                            });
                                            bot.on('messageReactionRemove', function (react, user) {
                                              console.log('remove');
                                            });
                                          }
                                          /*
                                          message.channel.awaitMessages(filter, { max: 1, time: time }).then(async(collected) => {   
                                            //checks if message was received
                                            if(collected.first() != null){
                                                
                                              //message received
                                              console.log('collected');
                                              awaitedArr = collected.first().content.toLowerCase().split(" ");
                                              awaited = awaitedArr[0];
                                              bool = true;
                                                }else{
                                                      //no message received
                                              console.log('no msg collected');
                                              bool = false;
                                                    }
                                          });
                                          */


                                          bool;
                                          console.log("bool: ".concat(bool));
                                          console.log('post timeout');

                                          if (!(bool === false)) {
                                            _context2.next = 10;
                                            break;
                                          }

                                          msgCustom.edit("Times up \u23F0"); //chosen command is a command

                                          _context2.next = 51;
                                          break;

                                        case 10:
                                          if (!Object.keys(commandOptions).some(function (key) {
                                            return key.toLowerCase().includes(awaited);
                                          })) {
                                            _context2.next = 50;
                                            break;
                                          }

                                          //if command is faulty
                                          boolErr = false; //chosen command object

                                          cmdOption = Object.keys(commandOptions).find(function (key) {
                                            return key.toLowerCase().includes(awaited.toLowerCase());
                                          }); //mark chosen command as chosen in embed

                                          commandOptions[cmdOption] = "\u2705"; //with command infront

                                          awaitedCommandArgs = awaitedArr;
                                          console.log("awaitedCommandArgs:");
                                          console.log(awaitedCommandArgs);
                                          awaitedArr.shift(); //without command infront ( data type to add )

                                          awaitedArgs = awaitedArr;
                                          console.log("awaitedArgs:");
                                          console.log(awaitedArgs); //args as chars

                                          charArr = awaitedArr[0].split('');
                                          console.log('charArr:');
                                          console.log(charArr); //redefine options command table in embed

                                          newValue = "";

                                          for (obj in commandOptions) {
                                            newValue = "".concat(newValue, " \n").concat(commandOptions[obj], " ").concat(obj);
                                          }

                                          ; //edit embed to contain the new table

                                          optionsEmbed.spliceFields(0, 1, {
                                            name: 'Options',
                                            value: "".concat(newValue)
                                          });
                                          _context2.t0 = awaited;
                                          _context2.next = _context2.t0 === "!setcolor" ? 31 : _context2.t0 === "!settitle" ? 35 : _context2.t0 === "!settitlelink" ? 38 : _context2.t0 === "!setdescription" ? 41 : _context2.t0 === "!addtimestamp" ? 42 : _context2.t0 === "!setauthor" ? 43 : _context2.t0 === "!setthumbnail" ? 44 : _context2.t0 === "!addfield" ? 45 : _context2.t0 === "!setimage" ? 46 : 47;
                                          break;

                                        case 31:
                                          //checks if chars in code are a-f CHAR RANGE WRONG
                                          charInHex = function charInHex() {
                                            var validChar = true;

                                            var charArr = _toConsumableArray(awaitedArr);

                                            charArr.forEach(function (_char) {
                                              //not in range
                                              if (!_char.match(/[a-fA-F]/)) {
                                                if (!isNaN(_char)) {
                                                  validChar = true;
                                                } else validChar = false;
                                              }
                                            });
                                            return validChar;
                                          }; //checks if numbers in code are 0-9


                                          numInHex = function numInHex() {
                                            var validNum = true;
                                            charArr.forEach(function (_char2) {
                                              if (_char2 > 9 || _char2 < 0) {
                                                //not in range
                                                validNum = false;
                                              }
                                            });
                                            return validNum;
                                          }; //check if user added color


                                          if (!awaitedArr) {
                                            console.log("no args");
                                            message.reply("Please add a color to change the embed to."); //hexcode 
                                          } else if (awaitedArr[0].length === 6 && charInHex(awaitedArr) && numInHex(awaitedArr)) {
                                            //WHITE work around
                                            if (charArr.every(function (val) {
                                              return val.toLowerCase() === 'f';
                                            })) {
                                              customEmbed.setColor('0xeffffe');
                                            } else {
                                              customEmbed.setColor("0x".concat(charArr.join('')));
                                            } //RGB

                                          } else if (awaitedArr.length === 3 && awaitedArr.every(function (val) {
                                            return val <= 255;
                                          }) && awaitedArr.every(function (val) {
                                            return val >= 0;
                                          })) {
                                            //WHITE work around
                                            if (Math.floor(awaitedArgs[0]) === 255 && Math.floor(awaitedArgs[1]) === 255 && Math.floor(awaitedArgs[2]) === 255) {
                                              console.log("setting color...");
                                              customEmbed.setColor('0xfffffe');
                                            } else {
                                              rgbtohex = function rgbtohex(r, g, b) {
                                                return "#" + (Math.round(r) * 65536 + Math.round(g) * 256 + Math.round(b)).toString(16);
                                              };

                                              console.log("setting color...");
                                              customEmbed.setColor(rgbtohex(awaitedArgs[0], awaitedArgs[1], awaitedArgs[2]));
                                            }
                                          } else {
                                            console.log("not a color");
                                            boolErr = true;
                                          }

                                          return _context2.abrupt("break", 47);

                                        case 35:
                                          console.log("setting title...");
                                          customEmbed.setTitle(awaitedArgs.join(' '));
                                          return _context2.abrupt("break", 47);

                                        case 38:
                                          customEmbed.setTitle('test');
                                          customEmbed.setURL(awaitedArgs[0]);
                                          return _context2.abrupt("break", 47);

                                        case 41:
                                          return _context2.abrupt("break", 47);

                                        case 42:
                                          return _context2.abrupt("break", 47);

                                        case 43:
                                          return _context2.abrupt("break", 47);

                                        case 44:
                                          return _context2.abrupt("break", 47);

                                        case 45:
                                          return _context2.abrupt("break", 47);

                                        case 46:
                                          return _context2.abrupt("break", 47);

                                        case 47:
                                          //
                                          if (boolErr === false) {
                                            console.log("no boolErr");
                                            msgCustom.edit(customEmbed);
                                            msg.edit(optionsEmbed);
                                          } else {
                                            console.log("boolErr");
                                            msg["delete"]();
                                          } //message awaited is not a command


                                          _context2.next = 51;
                                          break;

                                        case 50:
                                          message.channel.send("Not a command.");

                                        case 51:
                                        case "end":
                                          return _context2.stop();
                                      }
                                    }
                                  });
                                }));

                              case 2:
                                customMessage = _context3.sent;

                              case 3:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        });
                      });

                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            }));

          case 12:
            _context5.next = 19;
            break;

          case 14:
            //args embed
            message.deletable ? message["delete"]() : null;

            if (!(args.length < 1)) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", message.reply("Nothing to say?"));

          case 17:
            embed = new Discord.MessageEmbed().setColor(roleColor).setDescription(args.join(" ")).setTimestamp().setAuthor(message.author.username, message.author.displayAvatarURL());
            message.channel.send(embed);

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};
/*  COMMANDS 

  (`!setColor`, `[hexCode]`)
  (`!setTitle`,`[String]`)
  (`!setTitlelink`,`[URL]`)
  (`!setDescription`,`[String]`)
  (`!addTimestamp`,`[toggle]`)
  (`!setAuthor`,`[@Mention]`)
  (`!setThumbnail`,`[URL]`)
  (`!addField`,`[String(title), String(value), Boolean(inline)]`)
  (`!setImage`,`[URL]`) 

*/