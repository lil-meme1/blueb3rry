const Discord = require('discord.js');
const fs = require('fs');
const MessageEmbed = require("discord.js");
const { resolve } = require('path');
const { rejects } = require('assert');
module.exports = {
  name: "embed",
  category: "fun",
  description: "Embeds your message, allows you to create custom embeds",
  run: async (bot, message, args) => {
    
    const filter = m => m.author.id === message.author.id;
    const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

    //check if embed should be custom
    if(args.length >= 1 && args[0].toString().toLowerCase() === "custom"){

      //custom embed
      const time = 10000;
      let customEmbed = new Discord.MessageEmbed()
      let customMessage;  //the message containing the custom embed
      
      let awaited;
      let awaitedArr;

      //array of command options the user can choose from
      let commandOptions = {
        "!setColor [hexCode or R G B ]" : "1️⃣" , 
        "!setTitle [String]" : "2️⃣" , 
        "!setTitlelink [URL]" : "3️⃣" , 
        "!setDescription [String]" : "4️⃣" ,
        "!addTimestamp [toggle]" : "5️⃣" , 
        "!setAuthor [@Mention]" : "6️⃣" , 
        "!setThumbnail [URL]" : "7️⃣" , 
        "!addField [String(title), String(value), Boolean(inline)]" : "8️⃣" , 
        "!setImage [URL]" : "9️⃣"
      };

      //valueText
      let valueText = "";
      for( obj in commandOptions){

        valueText = `${valueText} \n${commandOptions[obj]} ${obj}`;

      };

      //embed to visualize settings to choose from and which have been chosen allready
      let optionsEmbed = new Discord.MessageEmbed()
      .setColor(roleColor)
      .setTitle('Custom embed creator')
	    .setDescription('allows you to choose options to add to an embed, then send said embed.')
	    .addFields(
        { name: 'Options', value: `${valueText}` }
	    )
	    .setFooter('Choose an option to add to the embed', 'https://cdn.discordapp.com/attachments/792859607713185812/792860389674451004/2.png');

      
      
      //lets user know that messages are being awaited and when it ends

      await message.channel.send(optionsEmbed).then(async (msg) =>{

        //add reactions according to 
        let reactions = Object.values(commandOptions);

        async function addReactions(message, reactions){
          message.react(reactions[0]);
          reactions.shift();
          if(reactions.length > 0){
            setTimeout( () => addReactions(message, reactions),500);
          }
        };

        addReactions(msg , reactions).then( async() => {

          customMessage = await message.channel.send(`\n<@${message.author.id}> Please specify embed options now: [time = ${time/1000} s]\nCurrent Embed: \n`, customEmbed ).then(async(msgCustom) => {
          
            let bool = false;
            console.log('infront of while');
            while(bool = false){
              //wait for react to embed  
              bot.on('messageReactionAdd', (react, user) => {
                
                console.log('add');
                console.log(`emoji: ${react().emoji.toString()}`);
                
                if(Object.values(commandOptions).some() === react().emoji.toString()){
                  console.log('react collected');
                  bool = true
                }
                
              })

              bot.on('messageReactionRemove', (react, user) =>{

                console.log('remove');

              })
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

            console.log(`bool: ${bool}`);
            console.log('post timeout');

              if(bool === false){
  
                msgCustom.edit(`Times up ⏰`);
  
              //chosen command is a command
              }else if(Object.keys(commandOptions).some( key => key.toLowerCase().includes(awaited))){
  
                //if command is faulty
                let boolErr = false;
  
                //chosen command object
                const cmdOption = Object.keys(commandOptions).find( key => key.toLowerCase().includes(awaited.toLowerCase()));
  
                //mark chosen command as chosen in embed
                commandOptions[cmdOption] = `✅`;
                
                //with command infront
                let awaitedCommandArgs = awaitedArr; 
                console.log(`awaitedCommandArgs:`);
                console.log(awaitedCommandArgs);
              
                awaitedArr.shift();
                            
                //without command infront ( data type to add )
                let awaitedArgs = awaitedArr;
                console.log(`awaitedArgs:`);
                console.log(awaitedArgs);
              
                //args as chars
                let charArr = awaitedArr[0].split(''); 
                console.log('charArr:');
                console.log(charArr);
  
                //redefine options command table in embed
                let newValue = ``;
                for( obj in commandOptions){
  
                  newValue = `${newValue} \n${commandOptions[obj]} ${obj}`;
              
                };
  
                //edit embed to contain the new table
                optionsEmbed.spliceFields(0,1,{ name: 'Options', value: `${newValue}` });
  
                switch(awaited){
  
                  //sets color of custom embed
                  case "!setcolor": 
  
                    //checks if chars in code are a-f CHAR RANGE WRONG
                    function charInHex(){
  
                      let validChar = true;               
                      let charArr = [...awaitedArr];
  
                      charArr.forEach(char => {
                        //not in range
                        if(!char.match(/[a-fA-F]/)){
                          if(!isNaN(char)){
                            validChar = true;
                          }else
                          validChar = false;
                        }
  
                      })
  
                      return validChar;
  
                    }
  
                    //checks if numbers in code are 0-9
                    function numInHex(){
                      let validNum = true;
                    
                      charArr.forEach(char => {
                        if(char > 9 || char < 0){
                          //not in range
                          validNum = false;
                        }
                      });
                      return validNum;
                    }
  
                    //check if user added color
                    if(!awaitedArr){
  
                      console.log("no args");
                      message.reply("Please add a color to change the embed to.");
  
                    //hexcode 
                    }else if(awaitedArr[0].length === 6 && charInHex(awaitedArr) && numInHex(awaitedArr)){
  
                      //WHITE work around
                      if(charArr.every((val) => val.toLowerCase() === 'f')){
  
                        customEmbed.setColor('0xeffffe');
  
                      }else{
  
                        customEmbed.setColor(`0x${charArr.join('')}`);
  
                      }
                    //RGB
                    }else if(awaitedArr.length === 3 && awaitedArr.every((val) => val <= 255) && awaitedArr.every((val) => val >= 0)){
  
                      //WHITE work around
                      if(Math.floor(awaitedArgs[0]) === 255 && Math.floor(awaitedArgs[1]) === 255 && Math.floor(awaitedArgs[2]) === 255){
  
                        console.log("setting color...");
                        customEmbed.setColor('0xfffffe');
  
                      }else{
  
                        function rgbtohex(r,g,b){
  
                          return "#" + (Math.round(r) * 65536 + Math.round(g) * 256 + Math.round(b)).toString(16);
  
                        }
  
                        console.log("setting color...");
                        customEmbed.setColor(rgbtohex(awaitedArgs[0],awaitedArgs[1],awaitedArgs[2]));
  
                      }
  
                    }else{
  
                      console.log("not a color");
                      boolErr = true;
  
                    }
  
                  break;
  
                  //sets title of custom embed
                  case "!settitle": 
  
                    console.log("setting title...");
                    customEmbed.setTitle(awaitedArgs.join(' '));
  
                  break;
  
                  //sets title link of custom embed
                  case "!settitlelink": 
  
                    customEmbed.setTitle('test');
                    customEmbed.setURL(awaitedArgs[0]);
  
                  break;
  
                  //sets description of custom embed
                  case "!setdescription": 
  
  
  
                  break;
  
                  //adds timestamp to custom embed
                  case "!addtimestamp": 
  
  
  
                  break;
  
                  //sets the author of custom embed
                  case "!setauthor":
  
  
  
                  break;
  
                  //sets thumbnail of custom embed
                  case "!setthumbnail":
  
  
  
                  break;
  
                  //adds a field to custom embed
                  case "!addfield":
  
  
  
                  break;
  
                  //sets image of custom embed
                  case "!setimage":
  
  
  
                  break;
  
                }
                
                //
                if(boolErr === false){
                  console.log("no boolErr");
                  msgCustom.edit(customEmbed);
                  msg.edit(optionsEmbed);
                }else{
                  console.log("boolErr");
                  msg.delete();
                }
                  
              //message awaited is not a command
              }else{
  
                message.channel.send(`Not a command.`);
  
              }
            //}, time);
            //}//end of while
          })
        })
      })   
    }else{

      //args embed
      (message.deletable) ? message.delete() : null;

      if(args.length < 1)
        return message.reply("Nothing to say?");

      const embed = new Discord.MessageEmbed()
        .setColor(roleColor)
        .setDescription(args.join(" "))
        .setTimestamp()
        .setAuthor(message.author.username, message.author.displayAvatarURL());
      message.channel.send(embed);

    }
  }
}

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