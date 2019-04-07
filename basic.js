class main {

// * Create Event
constructor() {
	
// Require
const bot = new (require("./discord_bot.js"))();
const colors = require("colors");
const request = require('request');
const fs = require('fs');
const RichEmbed = bot.RichEmbed;
const operator_start = 'o!';

// Variable init
this.userList = { };

// ! Bot started
bot.Emitter.on('start', () => {
console.log(" Discord Bot is now Running ".inverse);
bot.client.user.setStatus('available');
bot.client.user.setActivity('on Android',
	{ type: 'WATCHING' });
});

// ! Bot on messages
bot.Emitter.on('message', (user, message)=>{

var Array = message.content.split(' ');
switch(Array[0]) {

case 'Termux':
	var tempEmbed = new RichEmbed()
	.setTitle("Yes. This bot is running on Termux")
	.setAuthor("Ohkay")
	.setTimestamp();
	message.channel.send(tempEmbed);
	console.log(" - get Termux Operator".gray);
break;

case 'news':
	request('https://news.yahoo.co.jp/pickup/computer/rss.xml', (error, response, html)=>{
	if (!error) {
	var str = html.split('<item>');
	for(var i = 1; i < str.length; i++) {
		var embed = new RichEmbed()
		.setAuthor(str[i].split('<title>')[1].split('</title>')[0])
		.setTitle(str[i].split('<link>')[1].split('</link>')[0]);
		message.channel.send(embed);
	}}});
break;

default:
// is it start with operator_start?
if(Array[0].startsWith(operator_start)) {
	try {
if(fs.existsSync(`function/${Array[0].split(operator_start)[1]}.js`)) {
var func = require(`./function/${Array[0].split(operator_start)[1]}.js`);
func(user, message, this);
console.log(" - running func".gray);
	}}catch(err){console.log(err);}
}

// other message
else {
// user is exists?
if (fs.existsSync(`user/${message.author.id}.json`)) {
var json_read = JSON.parse(fs.readFileSync(`./user/${message.author.id}.json`));
json_read.exp = json_read.exp + (message.content).length;
fs.writeFileSync(`./user/${message.author.id}.json`, JSON.stringify(json_read));
}

// not exists
else {
var json_clear = require('./function/clear_user_data.js');
json_clear(message.author.id);
}

}

break;
}});

// Bot start
bot.start('NTUyNjk4ODQ1MzY5NDY2ODkx.D2DUeg.-eaFse4wcJQo4HkWs-EEER1Px20');
}

// Other function's

}


// TODO: Auto-matic Start!
main = new main();
