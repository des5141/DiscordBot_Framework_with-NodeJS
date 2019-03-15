'use strict';
const discord_bot = require("./discord_bot.js");
const { Client, RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const bot = new discord_bot();
const music = require("node-hashtable");
const translate_mode = require("node-hashtable");
var translate_A = "";
var translate_B = "";
const interduce = new RichEmbed()
    .setTitle('야레야레, 오레사마 등장!')
    .setColor(0xFF0000)
    .setAuthor("Ohkay", "https://www.suyongso.com/files/attach/images/115/940/418/024/99b983892094b5c6d2fc3736e15da7d1.jpeg")
    .setImage("https://www.suyongso.com/files/attach/images/115/377/837/024/99b983892094b5c6d2fc3736e15da7d1.jpeg")
    .setDescription("--설명\n--재생 [유튜브 링크]\n--중지\n--추천\n--번역모드 [대상언어(ko)] [변환언어(ja)]\n--삭제 [개수 : 최대 99개, 14일 이내만 가능]\n\n **명령어들을 사용해보라굿..!**\n~~따,,,딱히 널 위해 준비한게 아니니까 착각하지말라구!!~~\n\n아 참고로 난 갠톡으로 보내는 찐따들에게 답변해주지않는다구~ 잘 알아둬!")
    .setTimestamp();
bot.start("NTUyNjk4ODQ1MzY5NDY2ODkx.D2DUeg.-eaFse4wcJQo4HkWs-EEER1Px20"); // 서버의 Token

// 메세지를 받음
bot.Emitter.on('message', (user, message) => {
    var Array = message.content.split(' ');
    switch (Array[0]) {
        case "--재생":
            if (message.guild) {
                if (message.member.voiceChannel) {
                    message.member.voiceChannel.join()
                        .then(connection => {
                            if (music.get(message.channel.guild.name) != undefined) {
                                music.get(message.channel.guild.name).end();
                            }
                            message.channel.send("재생 시작");
                            const stream = ytdl(Array[1], { filter: 'audioonly' });
                            music.set(message.channel.guild.name, connection.playStream(stream, streamOptions));
                        })
                        .catch(console.log);
                } else {
                    message.channel.send("실패");
                }
            }
            break;

        case "--중지":
            if (message.guild) {
                if (music.get(message.channel.guild.name) != undefined) {
                    (music.get(message.channel.guild.name)).end();
                }
                message.member.voiceChannel.leave();
            }
            break;

        case "--번역모드":
            if (message.guild) {
                if (translate_mode.get(message.channel.guild.name) == undefined)
                    translate_mode.set(message.channel.guild.name, -1);
                translate_mode.set(message.channel.guild.name, translate_mode.get(message.channel.guild.name) * -1);

                if (translate_mode.get(message.channel.guild.name) == -1)
                    message.channel.send("**번역모드를 껐습니다**");
                if (translate_mode.get(message.channel.guild.name) == 1) {
                    message.channel.send("**번역모드를 켰습니다**");
                    if (Array.length == 3) {
                        translate_A = Array[1];
                        translate_B = Array[2];
                    }
                }
            }
            break;

        case "--상태":
            if (message.guild) {
                var text = "**현재 Ohkay 의 상태는?**" + "\n";
                if ((translate_mode.get(message.channel.guild.name) == 1) && (translate_mode.get(message.channel.guild.name) != undefined))
                    text += "- 현재 **번역모드**가 켜져있습니다." + "\n";

                if (music.get(message.channel.guild.name) != undefined)
                    text += "- 현재 노래를 재생 중입니다" + "\n";
            }
            message.channel.send(text);
            break;

        case "--추천":
            message.channel.send("https://mangashow5.me/bbs/board.php?bo_table=msm_manga&wr_id=36279");
            break;

        case "--설명":
            message.channel.send(interduce);
            break;

        case "--삭제":
            if (message.guild) {
                if (Array.length == 2) {
                    var limit = Array[1];
                    if (limit > 99)
                        limit = 99;
                    async function clear() {
                        message.delete();
                        const fetched = await message.channel.fetchMessages({ limit: limit });
                        message.channel.bulkDelete(fetched);
                    }
                    clear();
                }
            }
            break;

        default:
            if (message.guild) {
                if ((translate_mode.get(message.channel.guild.name) != undefined) && (translate_mode.get(message.channel.guild.name) == 1)) {
                    bot.translate(translate_A, translate_B, message, translate);
                }
            }
            break;
    }
});

// 서버 시작시
bot.Emitter.on('start', () => {
    console.log("서버 시작");
    bot.send("외국문화동아리", "bottest", interduce);
    bot.client.user.setStatus('available')
    bot.client.user.setActivity('--설명', { type: 'WATCHING' });
});

function translate(String, message) {
    message.channel.send(String);
}