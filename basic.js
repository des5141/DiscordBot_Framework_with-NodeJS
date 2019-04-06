const bot = new (require("./discord_bot.js"))();
var colors = new require("colors");
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
	}
});
