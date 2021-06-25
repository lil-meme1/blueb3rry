const Discord = require("discord.js");
module.exports = {
    name: "draw",
    category: "fun",
    description: "generate a deck of cards / draw a random card",
    run: async (bot, message, args) => {

        const range = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        const symbol =  ['♠','♣','♥','♦'];
        let deck = [];
        let drawnCards = [];

        //deck of cards created with loops
        for(var symbolCounter = 0; symbolCounter < symbol.length; symbolCounter++){
            for(var rangeCounter = 0; rangeCounter < range.length; rangeCounter++){
                deck.push(`${range[rangeCounter]} ${symbol[symbolCounter]}`);
            }
        }

        //draw and remove a random card from deck
        function randomDraw(){

            if(deck.length === 0) return;

            //pick a random card position
            const index = Math.floor( Math.random() * deck.length );

            // get the random card
            let card = deck[index];

            //filter out / remove the card from the deck
            deck = deck.filter(item => item != card);

            //keep track of cards drawn in array
            drawnCards.push(card);

            return card;     
        }

        //user custom draw amount
        var drawCount;
        (args[0]) ? drawCount = args[0] : drawCount = 5;

        //embed with cards drawn
        let embed = new Discord.MessageEmbed()
            .setTitle('Cards drawn:');
            for(drawCount; drawCount > 0; drawCount--){
                embed.addField(`${randomDraw()}`,` `,true)
            }
        message.channel.send(embed);
    
    }
}