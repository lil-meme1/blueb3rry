const Discord = require('discord.js');
const MessageEmbed = require("discord.js");
let coins = require(`../../commands/info/coins.json`);
module.exports = {
    name: "slot",
    category: "fun",
    description: "Fixed roller slot machine that costs 10 to spin. (!slot fruits to take a look at the slot order)",
    run: async (bot, message, args) => {

        var fruit = new Array('🍌','🍋','🍓','🍒','🍇','🍉','🍌','🍋');
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
        
        //walzen info
        if(args[0] === "fruit"){  

            message.reply('\n🍋\n🍓\n🍒\n🍇\n🍉\n🍌');

        //custom einsatz
        }else if (isNaN(args[0]) === false){
    
            console.log(args[0])
            symbol1 = Math.floor(Math.random()*(fruit.length - 2))+1; //over and under symbol 1
                symbol1o = symbol1-1;
                symbol1u = symbol1+1;
            symbol2 = Math.floor(Math.random()*(fruit.length - 2))+1; //over and under symbol 2
                symbol2o = symbol2-1;
                symbol2u = symbol2+1;
            symbol3 = Math.floor(Math.random()*(fruit.length - 2))+1; //over and under symbol 3
                symbol3o = symbol3-1;
                symbol3u = symbol3+1;

            //cost
            const price = args[0];
            if(args[0] <= 0 ){

                message.channel.send("Please only use numbers above 0 as bet amounts.")
                return

            }else if(coins[message.author.id].coins - price >= 0){

            }else{

                message.channel.send("You don't have enough money! 💰");
                return

            }

            //win or loose
            var win;
            if(symbol1 === symbol2 && symbol2 === symbol3){

                win = "You win :D" ;
                coins[message.author.id].coins = coins[message.author.id].coins + price * 30;

            }else if(symbol1o === symbol2 && symbol2 === symbol3u){

                win = "You win :D" ;
                coins[message.author.id].coins = coins[message.author.id].coins + price * 20;

            }else if(symbol1u === symbol2 && symbol2 === symbol3o){

                win = "You win :D" ;
                coins[message.author.id].coins = coins[message.author.id].coins + price * 20;

            }else{

                win = "You loose :(";
                
            }
            
            coins[message.author.id].coins = coins[message.author.id].coins - price;
            
            //embed for looks
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor)
                .setDescription("\n" + 
                    fruit[symbol1o] + ' | ' + fruit[symbol2o] + ' | ' + fruit[symbol3o] + "\n"+
                    fruit[symbol1] + ' | ' + fruit[symbol2] + ' | ' + fruit[symbol3] + "\n"+ //winning lane
                    fruit[symbol1u] + ' | ' + fruit[symbol2u] + ' | ' + fruit[symbol3u] + "\n" + win)
                .setTimestamp()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
            message.reply(embed);

        //standard einsatz
        }else{
        
            symbol1 = Math.floor(Math.random()*(fruit.length - 2))+1 //over and under symbol 1
                symbol1o = symbol1-1
                symbol1u = symbol1+1
            symbol2 = Math.floor(Math.random()*(fruit.length - 2))+1 //over and under symbol 2
                symbol2o = symbol2-1
                symbol2u = symbol2+1
            symbol3 = Math.floor(Math.random()*(fruit.length - 2))+1 //over and under symbol 3
                symbol3o = symbol3-1
                symbol3u = symbol3+1

            //cost
            const price = 10; //cost per spin
            if(coins[message.author.id].coins - price >= 0){
                
            }else{

                message.reply("You don't have enough money! 💰");
                return

            }

            //win or loose
            var win;
            if(symbol1 === symbol2 && symbol2 === symbol3){

                win = "You win :D" ;
                coins[message.author.id].coins = coins[message.author.id].coins + price * 30;

            }else if(symbol1o === symbol2 && symbol2 === symbol3u){

                win = "You win :D" ;
                coins[message.author.id].coins = coins[message.author.id].coins + price * 20;

            }else if(symbol1u === symbol2 && symbol2 === symbol3o){

                win = "You win :D" ;
                coins[message.author.id].coins = coins[message.author.id].coins + price * 20;

            }else{

                win = "You loose :(";

            }

            coins[message.author.id].coins = coins[message.author.id].coins - price;

            //embed for looks
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor)
                .setDescription("\n" + 
                    fruit[symbol1o] + ' | ' + fruit[symbol2o] + ' | ' + fruit[symbol3o] + "\n"+
                    fruit[symbol1] + ' | ' + fruit[symbol2] + ' | ' + fruit[symbol3] + "\n"+ //winning lane
                    fruit[symbol1u] + ' | ' + fruit[symbol2u] + ' | ' + fruit[symbol3u] + "\n" + win)
                .setTimestamp()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
            message.reply(embed);
        }
    }
}