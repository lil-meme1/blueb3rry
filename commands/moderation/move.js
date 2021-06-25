const Discord = require("discord.js");
const { getMember } = require("../../functions.js");
module.exports = {
	name: "move",
	category: "moderation",
	description: "Moves member or voice channels into other voice channels.",
	run: async (bot, message, args) => {

		const seconds = 5;

		//collection of all voice channels
		const voiceChannels = message.member.guild.channels.cache.filter(channel => channel.type === 'voice');

		//array of all voice channel ids
		var voiceChannelsId = [];
		(voiceChannels != null)? voiceChannels.each( channel => voiceChannelsId.push(channel.id) ) : null;

		//cache of every guild member to be used
		const guildMembers = message.guild.members.cache;

		//let target = getTarget();
		//let destination = getDestination();

		//execute move of members to channel
		//dragTo(target,destination);



		//TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET	TARGET

		//empty array to await IDs of targets to be moved
		let target = [];

		message.channel.awaitMessages(m => m.author.id === message.author.id,{max: 1, time: (seconds * 1000) }).then(collected => {

			//shorten parameters in 1-liners
			const collectContent = collected.first().content;

			//find user by ID | m = member ( avoid interference with let member )
			let member = ( guildMembers.some( m => m.id === collectContent ) ) ? guildMembers.find(m => m.id === collectContent ) : null;

			//find user by PING / @TAG
			if(member === null) member = ( guildMembers.some( m => `<@!${m.id}>` === collectContent ) ) ? guildMembers.find(m => `<@!${m.id}>` === collectContent ) : null;

			//user found as a target
			if(member != null) {
				message.reply(`Member found: ${member}`);

				//if user is in VC
				const isInVc = (member.voice.channel.type === 'voice') ? true : false;

				//ERROR, user to be moved is not in a voice channel
				if(!isInVc) return message.reply(`target user ${member.user.username} is not in a voice channel`);

				return target.push(member);
			}


			//find channel by ID | ch = channel ( avoid interference with const let channel )
			let channel = (voiceChannelsId.some(id => id === collectContent ) ) ? voiceChannels.find(ch => ch.id === collectContent ) : null;

			//find channel by PING | ch = channel ( avoid interference with const let channel )
			if(channel === null) channel = ( voiceChannelsId.some(id => `<#${id}>` === collectContent ) ) ? voiceChannels.find(ch => `<#${ch.id}>` === collectContent ) : null;

			//channel found as a target
			if(channel != null){
				const membersMap = channel.members.map(user => user);

				//ERROR, no users connected to voice channel
				if(membersMap.size != 0) return message.reply(`${channel.name} has no members to be moved.`);

				//members of channel as targets
				channel.members.each(member => target.push(member) );

				let msgAppend = (`Targets in channel: `);
				target.forEach(u => {
					msgAppend.concat(`${u.user.username} , \n`);
				});

				return target;
			}

		}).catch( (error) => {

			message.reply(`No respond.. ${seconds} seconds, aborting move command.`);

		});

		//DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION	DESTINATION

		//destination to be moved to
		function getDestination(){

			const voiceStates = message.channel.guild.voiceStates.cache;

			//find member by ID
			let member = ( guildMembers.some( m => m.id === args[1] ) ) ? guildMembers.find(m => m.id === args[1]) : null;

			//find member by PING / @TAG
			if(member === null) member = ( guildMembers.some( m => `<@!${m.id}>` === args[1] ) ) ? guildMembers.find(m => `<@!${m.id}>` === args[1]) : null;

			if(member != null){

				console.log('user as destionation.');

			}

			//find channel by ID | ch = channel ( avoid interference with const let channel )
			let channel = (voiceChannelsId.some(id => id === args[1]) ) ? voiceChannels.find(ch => ch.id === args[1]) : null;

			//find channel by PING | ch = channel ( avoid interference with const let channel )
			if(channel === null) channel = ( voiceChannelsId.some(id => `<#${id}>` === args[1]) ) ? voiceChannels.find(ch => `<#${ch.id}>` === args[1]) : null;

			if(channel != null){

				console.log('channel as destination.');

			}
		}

		function dragTo(target,destination){

			console.log(`dragTo target(s): ${target} \ndragTo destination: ${destination}`);

		}
	}
}

//const voiceChannel = message.guild.channels.cache.find(channel => channel.id === voiceChannelId);