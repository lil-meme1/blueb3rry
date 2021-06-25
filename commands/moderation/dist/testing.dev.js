"use strict";

var Discord = require("discord.js");

var _require = require("../../functions.js"),
    getMember = _require.getMember;

var _require2 = require('discord-buttons'),
    MessageButton = _require2.MessageButton,
    MessageActionRow = _require2.MessageActionRow;

module.exports = {
  name: "testing",
  category: "moderation",
  description: "command to test stuff 2",
  run: function run(bot, message, args) {
    var circleButton, crossButton, button1, button2, button3, button4, button5, button6, button7, button8, button9, buttons, createRow, p1Button, p2Button, row1, row2, row3, playerRow, readyGame, playGame;
    return regeneratorRuntime.async(function run$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            createRow = function _ref(btn1, btn2, btn3) {
              var tmpRow = new MessageActionRow().addComponent(btn1).addComponent(btn2).addComponent(btn3);
              return tmpRow;
            };

            circleButton = new MessageButton().setStyle('gray').setEmoji('⭕').setID('circle');
            crossButton = new MessageButton().setStyle('gray').setEmoji('❌').setID('cross');
            button1 = new MessageButton().setStyle('gray').setEmoji('⬛').setID('1');
            button2 = new MessageButton().setStyle('gray').setEmoji('⬛').setID('2');
            button3 = new MessageButton().setStyle('gray').setEmoji('⬛').setID('3');
            button4 = new MessageButton().setStyle('gray').setEmoji('⬛').setID('4');
            button5 = new MessageButton().setStyle('gray').setEmoji('⬛').setID('5');
            button6 = new MessageButton().setStyle('gray').setEmoji('⬛').setID('6');
            button7 = new MessageButton().setStyle('gray').setEmoji('⬛').setID('7');
            button8 = new MessageButton().setStyle('gray').setEmoji('⬛').setID('8');
            button9 = new MessageButton().setStyle('gray').setEmoji('⬛').setID('9');
            buttons = [button1, button2, button3, button4, button5, button6, button7, button8, button9];
            // create playing field
            row1 = createRow(buttons[0], buttons[1], buttons[2]);
            row2 = createRow(buttons[3], buttons[4], buttons[5]);
            row3 = createRow(buttons[6], buttons[7], buttons[8]);
            playerRow = new MessageActionRow().addComponent(crossButton).addComponent(circleButton); // players join

            _context6.next = 19;
            return regeneratorRuntime.awrap(message.channel.send('Player 1 choose your symbol!', {
              components: playerRow
            }));

          case 19:
            console.log('before ready game');

            readyGame = function readyGame() {
              var ready, p1Ready;
              return regeneratorRuntime.async(function readyGame$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      ready = false;
                      p1Ready = false; // ready the game ( get players into game )

                      _context2.next = 4;
                      return regeneratorRuntime.awrap(bot.on('clickButton', function _callee(button) {
                        var player1, player2;
                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                if (!(button.clicker.user.id != message.author.id && !p1Ready)) {
                                  _context.next = 2;
                                  break;
                                }

                                return _context.abrupt("return", message.channel.send("<@".concat(button.clicker.user.id, "> sorry but only the user who started the game can be Player 1!")));

                              case 2:
                                // both players by ID
                                player1 = message.author.id;

                                if (p1Ready) {
                                  _context.next = 9;
                                  break;
                                }

                                // button for player 1
                                p1Button = new MessageButton().setStyle('green').setEmoji('🕵🏻‍♂️').setID("".concat(button.clicker.user.id)).setLabel("".concat(button.clicker.user.username)); // player 1 joins game

                                playerRow = button.id === 'cross' ? new MessageActionRow().addComponent(p1Button).addComponent(circleButton) : new MessageActionRow().addComponent(crossButton).addComponent(p1Button); // wait for Player 2

                                p1Ready = true;
                                button.defer();
                                return _context.abrupt("return", button.message.edit("Waiting for Player 2 to join.", {
                                  components: playerRow
                                }));

                              case 9:
                                if (!p1Ready) {
                                  _context.next = 17;
                                  break;
                                }

                                player2 = button.clicker.user.id != player1 ? button.clicker.user.id : null; // player 1 can't be player 2 

                                if (!(player2 === null)) {
                                  _context.next = 14;
                                  break;
                                }

                                button.defer();
                                return _context.abrupt("return", message.channel.send("<@".concat(button.clicker.user.id, "> You can't be Player 1 and Player 2")));

                              case 14:
                                // button for player 2
                                p2Button = new MessageButton().setStyle('green').setEmoji('🕵🏻‍♂️').setID("".concat(button.clicker.user.id)).setLabel("".concat(button.clicker.user.username)); // player 2 joins game

                                playerRow = button.label != p1Button.label ? new MessageActionRow().addComponent(p1Button).addComponent(p2Button) : new MessageActionRow().addComponent(p2Button).addComponent(p1Button);
                                ready = 'game is ready';

                              case 17:
                                _context.next = 19;
                                return regeneratorRuntime.awrap(button.defer());

                              case 19:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      }));

                    case 4:
                      ready = _context2.sent;

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            };

            playGame = function playGame() {
              var turns;
              return regeneratorRuntime.async(function playGame$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      // game
                      message.channel.send('Tic Tac Toe: ❌ Starts!', {
                        components: [row1, row2, row3]
                      });
                      turns = [1, 2, 1, 2, 1, 2, 1, 2, 0]; // https://discord-buttons.js.org/events/clickbutton

                      _context4.next = 4;
                      return regeneratorRuntime.awrap(bot.on('clickButton', function _callee2(button) {
                        var turn, newButton;
                        return regeneratorRuntime.async(function _callee2$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                if (!(turns.length === 0)) {
                                  _context3.next = 2;
                                  break;
                                }

                                return _context3.abrupt("return");

                              case 2:
                                // determine who is choosing
                                turn = turns.shift(); // set button to players choice

                                newButton = buttons.find(function (btn) {
                                  return btn.id === button.id;
                                });
                                newButton = turn === 2 ? circleButton : crossButton;
                                console.log("".concat(button.clicker.user.username, " chose: ").concat(button.id, " and set it to: ").concat(newButton.custom_id)); // button element that got chosen

                                buttons[parseInt(button.id) - 1] = newButton; // create new field

                                row1 = createRow(buttons[0], buttons[1], buttons[2]);
                                row2 = createRow(buttons[3], buttons[4], buttons[5]);
                                row3 = createRow(buttons[6], buttons[7], buttons[8]); //end game and delete after 30 seconds

                                if (!(turn === 0)) {
                                  _context3.next = 12;
                                  break;
                                }

                                return _context3.abrupt("return", button.message.edit("Game has ended!", {
                                  components: [row1, row2, row3]
                                }).then(function (msg) {
                                  return msg["delete"]({
                                    timeout: 30000
                                  });
                                }));

                              case 12:
                                button.message.edit("You chose: ".concat(button.id), {
                                  components: [row1, row2, row3]
                                });
                                button.defer();

                              case 14:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        });
                      }));

                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            };

            _context6.next = 24;
            return regeneratorRuntime.awrap(readyGame().then(function _callee3() {
              return regeneratorRuntime.async(function _callee3$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return regeneratorRuntime.awrap(playGame());

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            }));

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    });
  }
};