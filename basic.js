const bot = new (require("./discord_bot.js"))();
const colors = require("colors");
const request = require('request');
const fs = require('fs');
bot.start("NTUyNjk4ODQ1MzY5NDY2ODkx.D2DUeg.-eaFse4wcJQo4HkWs-EEER1Px20");
var test = new bot.RichEmbed()
	.setTitle("RichEmbed Testing")
	.setAuthor("Ohkay")
	.setTimestamp();
var userList = { };

bot.Emitter.on('start', () => {
	console.log(" Discord Bot is now Running ".inverse);
	bot.client.user.setStatus('available');
	bot.client.user.setActivity('Running on Android', { type: 'WATCHING' });
});

bot.Emitter.on('message', (user, message)=>{
	var Array = message.content.split(' ');
	switch(Array[0]) {
		case 'Termux':
			var tempEmbed = new bot.RichEmbed()
			.setTitle("Yes. This bot is running on Termux")
			.setAuthor("Ohkay")
			.setTimestamp();
			message.channel.send(tempEmbed);
			console.log(" - get Termux Operator".gray);
			break;

		case 'Count':
			if (userList[user] == undefined)
				userList[user] = 0;
			else
				userList[user]++;
			message.channel.send(`**Count** - ${userList[user]}`);
			console.dir(userList);
			break;

		case 'news':
			request('https://news.yahoo.co.jp/pickup/computer/rss.xml', (error, response, html)=>{
				if (error) {}else{
					var str = html.split('<item>');
					for(var i = 1; i < str.length; i++) {
					var embed = new bot.RichEmbed()
					.setAuthor(str[i].split('<title>')[1].split('</title>')[0])
					.setTitle(str[i].split('<link>')[1].split('</link>')[0]);
					message.channel.send(embed);
					}
				}
			});
			break;

		default:
			try {
				if(fs.existsSync('function/'+Array[0]+'.js')) {
					var func = require('./function/'+Array[0]+'.js');
					func(user, message);
					console.log(" - running func".gray);
				}
			}catch(err){
				console.log(err);
			}
			break;
	}
});
