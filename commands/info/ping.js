module.exports = {
    name: "ping",
    category: "info",
    description: "Returns Latency",
    run: async (bot, message, args) => {

        //shows bot and server ping / latency
        const msg = await message.channel.send(`🏓Pinging...`)
        msg.edit(`🏓 Pong\nLatency is: ${Math.floor(msg.createdAt - message.createdAt)}ms\nBOT Latency is: ${Math.floor(bot.ws.ping)}ms`)
        
    }
}