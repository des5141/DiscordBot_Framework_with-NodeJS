class discord_bot {
    constructor() {
        // Init
        const { Client, RichEmbed } = require('discord.js');
	this.RichEmbed = RichEmbed;
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
}
module.exports = discord_bot;
