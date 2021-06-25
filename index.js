const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ['MESSAGE' , 'CHANNEL', 'REACTION'], ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });
const MessageEmbed = require("discord.js");
const Collection = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
const { MessageButton, MessageActionRow } = require('discord-buttons');
let coins = require('./commands/info/coins.json');
let xp = require('./commands/info/xp.json');
let timeInVc = require('./commands/info/timeInVc.json');
require('discord-buttons')(bot);

// prefix for bot 
// NODE . to start bot
PREFIX = '!';

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");

config({
  path: __dirname + "/.env"
});

const handler = require(`./handler/commands.js`)(bot);

// slash commands
const getApp = (guildId) => {
  const app = bot.api.applications(bot.user.id);
  if(guildId){
    app.guilds(guildId);
  }
  return app;
}  

bot.on('ready', async () => {

  // idfk slash commands
  const idfkID = '443799866486030356';
  const cmds = await getApp(idfkID).commands.get();
  // console.log(cmds);

  // adding test for slash command
  await getApp(idfkID).commands.post({
    data: {
      name: 'slash',
      description: 'Testing slash commands'
    },
  });

  // adding slash embed command 
  await getApp(idfkID).commands.post({
    data: {
      name: 'embed',
      description: 'Displays an embed',
      options: [
        {
          name: 'name',
          description: 'Your Name',
          required: true,
          type: 3 // String
        },
        {
          name: 'age',
          description: 'Your Age',
          required: false,
          type: 4 // Integer
        }
      ]
    },
  });

  // // DELETE ANY SLASH COMMAND
  // await getApp(idfkID).commands('SLASH COMMAND ID').delete();
  
  // reply for slash command
  const slashReply = async (interaction, response) => {
    let data = {
      content: response
    }

    // check for embeds
    if(typeof response === 'object'){
      data = await createAPIMessage(interaction, response)
    }

    bot.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data
      }
    })
  }

  // reply slash commands using API message
  const createAPIMessage = async (interaction, content) => {
    const { data, files } = await Discord.APIMessage.create(
      bot.channels.resolve(interaction.channel_id),
      content
    )
    .resolveData()
    .resolveFiles()
    return { ...data, files } 
  }

  // backend of slash command
  bot.ws.on('INTERACTION_CREATE', async (interaction) => {
    const { name, options } = interaction.data;
    const command = name.toLowerCase();

    // // data on slash command
    // console.log(options);

    // different version of options ( loging )
    const args = {}
      if(options){
        for(const option of options){
          const { name, value } = option;
          args[name] = value;
        }
      }
    // console.log(args);

    // command "handler"
    if(command === 'slash')slashReply(interaction, 'Hello World!');
    if(command === 'embed'){
      // create embed 
      const embed = new Discord.MessageEmbed()
        .setTitle('Test title')
      // fill embed with options
      for(const arg in args){
        const value = args[arg];
        embed.addField(arg,value)
      }

      slashReply(interaction, embed);
    } 
  })

  // custom discord status
  bot.user.setActivity('!help', { type: 'WATCHING'}).catch(console.error);  

  const guilds = bot.guilds.cache;

  // manual update variables
  const updateVersion = `💎1.2💎`;
  const update = `Update ${updateVersion}

  Added:
  Nothing✅ 

  Removed:   
  \tUpdates (will be back)❌

  ☘ **ˢᵒᵐᵉ ʳᵉᵐᵒᵛᵉᵈ ᶠᵉᵃᵗᵘʳᵉˢ ʷᶦˡˡ ˢᵉᵉ ᵃ ʳᵉᵗᵘʳⁿ** ☘`;
  
  // send update to every server
  guilds.forEach(guild => {
  
    const updateChannel = guild.channels.cache.find(ch => ch.name.toLowerCase() === 'updates');

    // error catching if guild dosn't have a update channel
    if(updateChannel === null)return;
    if(!updateChannel)return;

    // checks if newest version is allready sent
    if(updateChannel.topic === updateVersion)return;

    updateChannel.setTopic(updateVersion);
    updateChannel.send(update);
    console.log(`Done updating ${guild.name} to version ${updateVersion}`);
    
  })
  console.log(`Completed update to version: ${updateVersion}`);

  // console approval
  console.log(`This bot (${bot.user.username}) is online! Currently running version ${updateVersion}!`);
  
});

// welcome message
bot.on('guildMemberAdd', (member) => { 

  const welcomeChannel = member.guild.channels.cache.find(welcomeChannel => welcomeChannel.name.toLowerCase() === 'welcome');
  if (!welcomeChannel) return;

  // embed to welcome member to server
  const welcomeEmbed = new Discord.MessageEmbed()
	  .setColor('#0x765bff')
	  .setTitle(`**${member.user.username} has arrived in ${member.guild.name}!**`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
    .addFields(
      { name: '\u200B', value: `${member.guild.name}'s membercount has reached **${member.guild.memberCount}** members.`, inline: true },
    )
  if(member.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'rules')){

    welcomeEmbed.setDescription(`Please read our rules in ${member.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'rules')}.`)

  }
  channel.send(`${member}`, welcomeEmbed);

  // update live member count
  const liveMemberChannel = member.guild.channels.cache.find(channel => channel.name.includes("Live Members: "));
  const memberAmt = member.guild.memberCount;

  if(liveMemberChannel.name != `Live Members: ${memberAmt} 🔥`)liveMemberChannel.setName(`Live Members: ${memberAmt} 🔥`);

});

bot.on('guildMemberRemove', (member) => {

  // update live member count
  const liveMemberChannel = member.guild.channels.cache.find(channel => channel.name.includes("Live Members: "));
  const memberAmt = member.guild.memberCount;

  if(liveMemberChannel.name != `Live Members: ${memberAmt} 🔥`)liveMemberChannel.setName(`Live Members: ${memberAmt} 🔥`);

});

// timed delete
bot.on('message', async (message) => {

  // const x = 10; // testing
  // const x = 60000; // 1 minute
  // const x = 86400000; // 1 day
  const x = 21600000; // 6 hours
  if(message.author.bot) return;
  if(message.member.guild.channels.cache.some(channel => channel.name.toLowerCase() !== 'delete')) return;

  const deleteChannel = message.member.guild.channels.cache.find(channel => channel.name.toLowerCase() === 'delete');

  if(message.channel.id === deleteChannel.id){

    message.delete({timeout : x});

  }
})

// when message is sent
bot.on('message', async (message) => {

  if(message.author.bot)return;
  // update live member count
  const liveMemberChannel = message.guild.channels.cache.find(channel => channel.name.includes("Live Members: "));
  if(liveMemberChannel === undefined){ 

  }else if(liveMemberChannel.name != `Live Members: ${message.guild.memberCount} 🔥`){

    liveMemberChannel.setName(`Live Members: ${message.guild.memberCount} 🔥`);

  }
  
  // XP SYSTEM
  if(!xp[message.author.id]){

    // no data found => set xp to 0
    xp[message.author.id] = {
      xp : 0
    }

  }else{

    // gain 1 xp per message if xp data exists
    xp[message.author.id] = {
      xp: xp[message.author.id].xp + 1
    }

  }

  // save xp
  fs.writeFileSync('./commands/info/xp.json', JSON.stringify(xp, null, 2), (err) => {

    if(err) console.log(err);

  });

  // LEVEL SYSTEM
  let level = Math.floor(xp[message.author.id].xp/1000);

  let userRoles = [];
  message.member.roles.cache.each(role => userRoles.push(role.name));
  // level roles user acctually has
  userRoles = userRoles.filter(str => str.startsWith('lvl '));

  // level role user should have
  let levelRole;
  if(Math.floor(level / 10) === 0){

    levelRole = message.member.guild.roles.cache.find(role => role.name.toLowerCase() === `lvl 0`);

  }else{

    levelRole = message.member.guild.roles.cache.find(role => role.name.toLowerCase() === `lvl ${Math.floor(level / 10)}0`);

  }

  // COIN SYSTEM
  if(!coins[message.author.id]){

    // no data found => set coins to 0
    coins[message.author.id] = {
      coins : 0
    }

  }

  let coinAmt = Math.floor(Math.random() * 5) + 10;
  let baseAmt = Math.floor(Math.random() * 5) + 10;

  if(coinAmt === baseAmt){

    coins[message.author.id] = {

      coins: coins[message.author.id].coins + coinAmt

    };

    // save coins
    fs.writeFile("./commands/info/coins.json", JSON.stringify(coins, null, 2), (err) => {

      if(err) console.log(err);

    })

  }

  // VC TIME SYSTEM
  if(!timeInVc[message.author.id]){

    // no data found => set timeInVc to 0
    timeInVc[message.author.id] = {
      timeInVc : 0
    }

  }  

  // save time in VC
  fs.writeFile("./commands/info/timeInVc.json", JSON.stringify(timeInVc, null, 2), (err) => {

    if(err) console.log(err);

  })

  
  // REMOVE OLD LVL ROLE(s)

  // remove old roles (higher levels)
  let highestRole = (userRoles.length > 0) ? userRoles.pop() : null;
  if(highestRole != null)highestRole = message.guild.roles.cache.find(role => role.name === highestRole.toString());

  while(highestRole != levelRole){
      
    if(highestRole === undefined || highestRole === null){

      break;

    }else{
        
      message.member.roles.remove(highestRole);

      highestRole = userRoles.pop();
      if(highestRole != undefined)highestRole = message.guild.roles.cache.find(role => role.name === highestRole.toString());
    
    }
  }

  // add role that belongs
  if(highestRole != null)userRoles.push(highestRole.name);
  userRoles = userRoles.filter(str => str.startsWith('lvl '));

  // check for level role and update it
  if(levelRole === undefined){

  }else if(levelRole.name.toLowerCase() != userRoles[userRoles.length-1] && userRoles != undefined){

    if(levelRole) message.member.roles.add(levelRole).then(message.channel.send('lvl up! 3'));

  }

  // remove old roles (lower levels)
  while(userRoles.length > 0){

    let toDelete = userRoles.pop();
    let toRole = message.guild.roles.cache.find(role => role.name === toDelete.toString());

    if(toRole === `lvl ${Math.floor(level) * 10}`){

      message.member.roles.remove(toRole);

    } 

  }

  // save memory by not running command
  if(!message.guild)return;
  if(!message.content.startsWith(PREFIX))return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
    
  // command runner
  const args = message.content.slice(PREFIX.length).trim().split(" ");
  const cmd = args.shift().toLowerCase();
  console.log(`${message.author.username} said: ${message.content} `);

  if(cmd.length === 0) return;
  let command = bot.commands.get(cmd);
  if(!command) command = bot.commands.get(bot.aliases.get(cmd));
  if(command) command.run(bot, message, args);
     
});

// voicechannel activity
var joinTime;
var leaveTime;

// voice state change
bot.on('voiceStateUpdate', (oldState, newState) => { 

  const channel = oldState.member.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'voicelog');
  if(channel === null || channel === undefined)return;
  let newUserChannel = newState.voiceChannel
  let oldUserChannel = oldState.voiceChannel

  if(newUserChannel === undefined){

    if(oldState.member.roles.cache.find(role => role.name.toLowerCase().includes(`admin`))  || oldState.member.roles.cache.find(role => role.name.toLowerCase().includes(`memster`)))
    return;
    if(oldState.member.mute){

      // ??
      channel.send(`${oldState.member}` + "\n MYSTERY \n" + `${oldState.channel}\n---\t\t---` + oldState.member.mute)

    }else if(oldState.channel === null){

      // joined
      channel.send(`${oldState.member}` + "\njoined:\n" + `${newState.channel}\n---\t\t---`);
      joinTime = Date.now();

    }else if(oldState.channel === newState.channel){

      if(newState.mute === true){

        if(newState.deaf === true){

          // deafen
          channel.send(`${oldState.member}` + "\ndeafend\n" + `${oldState.channel}\n---\t\t---`);

        }else{

          // mute
          channel.send(`${oldState.member}` + "\nmuted\n" + `${oldState.channel}\n---\t\t---`);

        }
      }else
        if(oldState.deaf === true){

          // undeafen
          channel.send(`${oldState.member}` + "\nundeafend\n" + `${oldState.channel}\n---\t\t---`);

        }else{

          // unmute
          channel.send(`${oldState.member}` + "\nunmuted\n" + `${oldState.channel}\n---\t\t---`);

        }
      }else if(oldState.channel && newState.channel){

      // switched channel || moved to channel
      channel.send(`${oldState.member}` + "\nswitched from:\n" + `${oldState.channel}\n to: \n${newState.channel}\n---\t\t---`);

    }else if((oldState.channel === newState.channel) === false && (oldState.channel && newState.channel) === false){

      console.log('unknown error, ctrl + f to see where to find');

    }else{

      // disconnected
      channel.send(`${oldState.member}` + "\ndisconnected from:\n" + `${oldState.channel}\n---\t\t---`);
      leaveTime = Date.now();

      // time spent in vc in ms and s
      let elapsedMs = leaveTime - joinTime;
      let elapsedSec = Math.floor(elapsedMs/1000);
      channel.send(`${oldState.member} [${oldState.member.id}]  spent ` + elapsedSec + " seconds in vc"); 

      // VC TIME SYSTEM
      if(!timeInVc[oldState.member.id]){

        // no data found => set timeInVc to 0
        timeInVc[oldState.member.id] = {
          timeInVc : 0
        }

      }
      
      // define time in VC
      timeInVc[oldState.member.id] = {
        timeInVc: timeInVc[oldState.member.id].timeInVc + Math.floor(elapsedSec) 
      }

      // save time spent in VC
      fs.writeFile("./commands/info/timeInVc.json", JSON.stringify(timeInVc, null, 2), (err) => {

        if(err) console.log(err);

      });
      
      // XP SYSTEM
      if(!xp[oldState.member.id]){

        // no data found => set xp to 0
        xp[oldState.member.id] = {
          xp : 0
        }

      }

      // gain xp as seconds spent in VC
      xp[oldState.member.id] = {
        xp: xp[oldState.member.id].xp + Math.floor(elapsedSec) 
      }

      // save xp
      fs.writeFile("./commands/info/xp.json", JSON.stringify(xp, null, 2), (err) => {

        if(err) console.log(err);

      });
       
    }
  }
});

bot.login(process.env.TOKEN);