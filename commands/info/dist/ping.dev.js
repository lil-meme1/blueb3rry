"use strict";

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns Latency",
  run: function run(bot, message, args) {
    var msg;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(message.channel.send("\uD83C\uDFD3Pinging..."));

          case 2:
            msg = _context.sent;
            msg.edit("\uD83C\uDFD3 Pong\nLatency is: ".concat(Math.floor(msg.createdAt - message.createdAt), "ms\nBOT Latency is: ").concat(Math.floor(bot.ws.ping), "ms"));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};