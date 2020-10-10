require("dotenv").config();


const { Client } = require('discord.js');
const bot = new Client();
const PREFISX = "$";


bot.on('ready', () =>{
    console.log(`${bot.user.tag} has logged In..!`);
});

bot.on('message', async (message) =>{
    if (message.author.bot) return;
    if (message.content.startsWith(PREFISX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFISX.length)
        .split(/\s+/);

        if (CMD_NAME === 'kick') {
            if (message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('You do not have permission to use that command!');
            if(args.length === 0) 
                return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                .kick()
                .then((member) => message.channel.send(`${member} was Kicked..`))
                .catch((err) => message.channel.send(`I cannot Kick that User ${member} :(`));
            } else {
                message.channel.send('That member is not found..!');
            }
    } else if ( CMD_NAME === 'ban') {
        if (message.member.hasPermission('BAN_MEMBERS'))
            return message.reply('You do not have permission to use that command!');
        if(args.length === 0) 
            return message.reply('Please provide an ID');

        try {
            const user = await message.guild.members.ban(args[0]);
            message.channel.send(`${user} Was Banned Successfully..`);
        } catch (err) {
            message.channel.send('An error occured, Either I do not have a permissions or user was not found!');
        }
    }
}        
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);