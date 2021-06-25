"use strict";

var Discord = require("discord.js");

module.exports = {
  name: "draw",
  category: "fun",
  description: "generate a deck of cards / draw a random card",
  run: function run(bot, message, args) {
    var range, symbol, deck, drawnCards, symbolCounter, rangeCounter, randomDraw, drawCount, embed;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            randomDraw = function _ref() {
              if (deck.length === 0) return; //pick a random card position

              var index = Math.floor(Math.random() * deck.length); // get the random card

              var card = deck[index]; //filter out / remove the card from the deck

              deck = deck.filter(function (item) {
                return item != card;
              }); //keep track of cards drawn in array

              drawnCards.push(card);
              return card;
            };

            range = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            symbol = ['♠', '♣', '♥', '♦'];
            deck = [];
            drawnCards = []; //deck of cards created with loops

            for (symbolCounter = 0; symbolCounter < symbol.length; symbolCounter++) {
              for (rangeCounter = 0; rangeCounter < range.length; rangeCounter++) {
                deck.push("".concat(range[rangeCounter], " ").concat(symbol[symbolCounter]));
              }
            } //draw and remove a random card from deck


            args[0] ? drawCount = args[0] : drawCount = 5; //embed with cards drawn

            embed = new Discord.MessageEmbed().setTitle('Cards drawn:');

            for (drawCount; drawCount > 0; drawCount--) {
              embed.addField("".concat(randomDraw()), " ", true);
            }

            message.channel.send(embed);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};