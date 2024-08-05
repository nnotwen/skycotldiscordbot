'use strict';

const { Events, Collection } = require('discord.js');
const { DateTime } = require('luxon');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: (client, message) => {
        // Attach to client instance
        if (!client.cooldown) client.cooldown = new Collection();

        if (!message.content.startsWith("!")) return;

        const tag = message.content.slice(1);
        let content;

        if (['skytime', 'skyclock'].includes(tag)){
            content = `**Sky Time**: ${DateTime.now().setZone('America/Los_Angeles').toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET)}.\n**Local Time**: <t:${DateTime.now().toUnixInteger()}:T>`;
        };
        
        if (['chevron', 'chevy', 'chevvy'].includes(tag)){
            content = "Chevron are the arrow like icons (^) embedded in your candle meter. Each player will begin the day (sky time) with three chevrons. The number of chevrons will be reduced by one when 5, 10, and 15 candles worth of wax are collected. When 20 candles worth of wax are collected, the candle meter will turn gray. Chevron will reset alongside the daily reset.\n\nSee also: `!chevron-wax`, `/when reset`";
        };

        if (tag === "chevron-wax"){
            content = "**Wax Conversion**: Required wax to forge in terms of Treasure Candles.\n\n* 3 Chevron - 1.88 Treasure Candles\n* 2 Chevron - 2.78 Treasure Candles\n* 1 Chevron - 3.56 Treasure Candles\n* No Chevron - 4.26 Treasure Candles for the first 2 candles. Succeeding candles requires 4.76, 9.76, and 19.76 Treasure Candles.\n\nA player needs 83.9 Treasure Candles worth of wax to reach the Gray Meter.\n\nSee also: `!chevron`"
        };

        if (['complete', 'perfect', '100'].includes(tag)){
            content = "Completion costs by realm:\n\n* Isle: 42 Candles, 12 Hearts, 3 Ascended Candles\n* Prairie: 122 Candles, 39 Hearts, 13 Ascended Candles\n* Forest: 145 Candles, 108 Hearts, 16 Ascended Candles\n* Valley: 107 Candles, 124 Hearts, 15 Ascended Candles\n* Wasteland: 111 Candles, 142 Hearts, 14 Ascended Candles* Vault: 104 Candles, 155 Hearts, 14 Ascended Candles\n* Elders: 0 Candles, 0 Hearts, 35 Ascended Candles\n\nTotal Cost: 631 Candles, 580 Hearts, 110 Ascended Candles";
        };

        if (['rl','ratelimit','cooldown'].includes(tag)){
            content = "This bot may occasionally skip your requests if you request too fast to prevent spam."
        };
        
        // Adds a 5 seconds cooldown to prevent spam 
        if (!content || (client.cooldown.get(message.author.id) ?? 0) > Date.now()) return;

        return message.channel.send(content).then(() => {
            client.cooldown.set(message.author.id, Date.now() + 5000);
        });
    },
};