module.exports = {
    name: "clear",
    category: "moderation",
    description: "Deletes last 100 messages or the specified amount.",
    run: async (bot, message, args) => {

        //base amount to delete
        let amt = 100;

        //member object of message author in guild
        const author = message.guild.members.cache.find(member => member.id === message.author.id);

        //check if author has perms to manage messages 
        if(author.permissions.toArray().includes('MANAGE_MESSAGES')){

            //check if argument exists
            if(args[0] && args[0].toString().trim() != ''){

                //args may only be number
                if(!isNaN(args[0])){

                    amt = args[0];

                    if(Math.floor(args[0]) <= 0 || amt > 100){

                        //error if amount given is not 1-100
                        message.reply(`Please only clear between 1-100 messages at once.`)

                    }else{

                        //deletes argument mentioned ammount of messages
                        amt = (Math.floor(args[0]) + 1);
                        message.channel.bulkDelete(amt , true).catch(console.error());

                    }
                //invalid args
                }else if(isNaN(args[0])){

                    //error message in chat
                    message.reply(`Please only use numbers to specify how many messages you would like to delete.`);

                }
            //no arguments deliver amt
            }else{
  
                //deletes 100 messages
                message.channel.bulkDelete(amt , true).catch(console.error()); 
            }
        }else{

            //Failmessage if user has no perms
            message.channel.send("Access Denied 🤏 You have no perms!");

        }
    }
}