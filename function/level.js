// require
const fs = require('fs');

function level (user, message, main) {
try{if(fs.existsSync(`./user/${message.author.id}.json`)) {
var json_read = JSON.parse(fs.readFileSync(`./user/${message.author.id}.json`));
message.channel.send(`**${user}** is lv.**${json_read.level}**, exp **${json_read.exp}**`);
}else{
message.channel.send(`**${user}** is not registered`);
}}catch(err){console.log(err);}
}

module.exports = level;
