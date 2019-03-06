class discord_bot {
    constructor() {
        // Init
        const { Client, RichEmbed } = require('discord.js');
        const EventEmitter = require('events');
        this.client = new Client();
        this.chat = "";
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
                this.Emitter.emit('message', message.author.username, message.content);
            }
        });
    }

    start(token) {
        this.client.login(token);
    }

    set(room) {
        this.chat = room;
    }

    send(message) {
        if (this.connected == true) {
            const channel = this.client.channels.find(ch => ch.name === this.chat);
            if (!channel) return;
            channel.send(message);
            return true;
        } else {
            return false;
        }
    }
}
module.exports = discord_bot