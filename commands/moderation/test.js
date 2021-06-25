const Discord = require("discord.js");
const { getMember } = require("../../functions.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
module.exports = {
    name: "test",
    category: "moderation",
    description: "command to test stuff",
    run: async (bot, message, args) => {
		
        const circleButton = new MessageButton()
            .setStyle('gray')
            .setEmoji('⭕')
            .setID('circle');
        
        const crossButton = new MessageButton()
            .setStyle('gray')
            .setEmoji('❌')
            .setID('cross');

        let button1 = new MessageButton()
            .setStyle('gray')
            .setEmoji('⬛')
            .setID('1');

        let button2 = new MessageButton()
            .setStyle('gray')
            .setEmoji('⬛')
            .setID('2');

        let button3 = new MessageButton()
            .setStyle('gray')
            .setEmoji('⬛')
            .setID('3');

        let button4 = new MessageButton()
            .setStyle('gray')
            .setEmoji('⬛')
            .setID('4');

        let button5 = new MessageButton()
            .setStyle('gray')
            .setEmoji('⬛')
            .setID('5');

        let button6 = new MessageButton()
            .setStyle('gray')
            .setEmoji('⬛')
            .setID('6');

        let button7 = new MessageButton()
            .setStyle('gray')
            .setEmoji('⬛')
            .setID('7');

        let button8 = new MessageButton()
            .setStyle('gray')
            .setEmoji('⬛')
            .setID('8');

        let button9 = new MessageButton()
            .setStyle('gray')
            .setEmoji('⬛')
            .setID('9');
        
        let buttons = [ button1 , button2 , button3 , button4 , button5 , button6 , button7 , button8 , button9 ];

        function createRow( btn1 , btn2 , btn3 ){

            let tmpRow = new MessageActionRow()
                .addComponent( btn1 )
                .addComponent( btn2 )
                .addComponent( btn3 );
            return tmpRow

        }

        let p1Button;
        let p2Button;

        // create playing field
        let row1 = createRow( buttons[0] , buttons[1] , buttons[2] );
        let row2 = createRow( buttons[3] , buttons[4] , buttons[5] );
        let row3 = createRow( buttons[6] , buttons[7] , buttons[8] );
        let playerRow = new MessageActionRow()
            .addComponent(crossButton)
            .addComponent(circleButton);

        // players join
        await message.channel.send('Player 1 choose your symbol!' , { components: playerRow })

		let readyGame = async () => {

            let ready = false;
            let p1Ready = false;

			let playerJoin = async () => {
				// ready the game ( get players into game )
				ready = await bot.on('clickButton', async ( button ) => {

					// make sure author is Player 1
					if(button.clicker.user.id != message.author.id && !p1Ready) return message.channel.send(`<@${button.clicker.user.id}> sorry but only the user who started the game can be Player 1!`);
					
					// both players by ID
					const player1 = message.author.id;
					let player2;
						
					// ready player 1
					if(!p1Ready){
						// button for player 1

						p1Button = new MessageButton()
							.setStyle('green')
							.setEmoji('🕵🏻‍♂️')
							.setID(`${button.clicker.user.id}`)
							.setLabel(`${button.clicker.user.username}`);

						// player 1 joins game

						playerRow = ( button.id === 'cross')? new MessageActionRow()
							.addComponent(p1Button)
							.addComponent(circleButton) : 
						new MessageActionRow()
							.addComponent(crossButton)
							.addComponent(p1Button);

						// wait for Player 2
						p1Ready = true;
						button.defer();
						return button.message.edit( `Waiting for Player 2 to join.` , { components: playerRow } ); 
					}                    

					// only get player 2 if player 1 is ready
					if(p1Ready){
						player2 = ( button.clicker.user.id != player1 ) ? button.clicker.user.id : null;

						// player 1 can't be player 2 
						if(player2 === null){
							button.defer();
							return message.channel.send(`<@${button.clicker.user.id}> You can't be Player 1 and Player 2`);
						} 

						// button for player 2

						p2Button = new MessageButton()
							.setStyle('green')
							.setEmoji('🕵🏻‍♂️')
							.setID(`${button.clicker.user.id}`)
							.setLabel(`${button.clicker.user.username}`);

						// player 2 joins game

						playerRow = ( button.label != p1Button.label)? new MessageActionRow()
							.addComponent(p1Button)
							.addComponent(p2Button) : 
						new MessageActionRow()
							.addComponent(p2Button)
							.addComponent(p1Button);
						ready = 'game is ready';                        
					}

					await button.defer(); 
				})
			} 

			do {

				await playerJoin();

			} while (ready != true)
        }

		console.log('before ready game');

		await readyGame();

		console.log('after ready game');

    }
}