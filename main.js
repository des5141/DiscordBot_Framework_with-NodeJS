'use strict';
const discord_bot = require("./discord_bot.js");
const { Client, RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const async = require('async');
const bot = new discord_bot();
const music = require("node-hashtable");
const translate_mode = require("node-hashtable");
var translate_A = "";
var translate_B = "";
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
                    music.get(message.channel.guild.name).end();
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
    const embed = new RichEmbed()
        .setTitle('A slick little embed')
        .setColor(0xFF0000)
        .setDescription('Hello, this is a slick embed!');
    console.log("서버 시작");
    bot.send("외국문화동아리", "bottest", embed);
    bot.client.user.setStatus('available')
    bot.client.user.setPresence({
        game: {
            name: '5등분의 신부 보십쇼',
            type: "",
            url: ""
        }
    });
});

function translate(String, message) {
    message.channel.send(String);
}