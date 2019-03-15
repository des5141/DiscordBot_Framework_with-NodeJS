class discord_bot {
    constructor() {
        // Init
        const { Client, RichEmbed } = require('discord.js');
        const EventEmitter = require('events');
        this.client = new Client();
        this.Emitter = new EventEmitter();
        this.connected = false;

        // Ready
        this.client.on("ready", () => {
            this.connected = true;
            this.Emitter.emit('start');
        });

        // Recv Message
        this.client.on("message", message => {
            if (!message.author.bot) {
                this.Emitter.emit('message', message.author.username, message);
            }
        });
    }

    start(token) {
        this.client.login(token);
    }

    send(server, room, message) {
        if (this.connected == true) {
            const channel = this.client.channels.find(ch => ch.name === room);
            if (!channel) return;
            if (channel.guild.name != server) return;
            channel.send(message);
            return true;
        } else {
            return false;
        }
    }

    translate(A, B, message, functions) {
        var client_id = 'ObhHWl0y741h_9ky4Dbv';
        var client_secret = 'RWoXmzjxa4';
        var request = require('request');

        var options = {
            url: 'https://openapi.naver.com/v1/papago/n2mt',
            form: { 'source': A, 'target': B, 'text': message.content },
            headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
        };

        request.post(options, function (error, response) {
            if (!error && response.statusCode == 200) {
                var objBody = JSON.parse(response.body);
                functions(objBody.message.result.translatedText, message);
            }
        });
    }
    
}
module.exports = discord_bot