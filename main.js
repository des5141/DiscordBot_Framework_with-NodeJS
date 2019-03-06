'use strict';
const discord_bot = require("./discord_bot.js");
const bot = new discord_bot();
bot.start("NTUyNjk4ODQ1MzY5NDY2ODkx.D2DUeg.-eaFse4wcJQo4HkWs-EEER1Px20"); // 서버의 Token
bot.set("general"); // 이용하는 텍스트 채널

// 메세지를 받음
bot.Emitter.on('message', (user, message) => {
    console.log(user + " : " + message);
    bot.send(user + " : " + message);
});

// 서버 시작시
bot.Emitter.on('start', () => {
    console.log("서버 시작");
});