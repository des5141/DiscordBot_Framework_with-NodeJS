class discord_bot {
    constructor() {
        // Init
        const { Client, RichEmbed } = require('discord.js');
        const EventEmitter = require('events');
        this.client = new Client();
        this.room = "";
        this.server = "";
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

    set(server, room) {
        this.server = server;
        this.room = room;
    }

    send(message) {
        if (this.connected == true) {
            const channel = this.client.channels.find(ch => ch.name === this.room);
            if (!channel) return;
            if (channel.guild.name != this.server) return;
            channel.send(message);
            return true;
        } else {
            return false;
        }
    }
}
module.exports = discord_bot