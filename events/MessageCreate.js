'use strict';

const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: (client, message) => {

        if (!message.content.startsWith("!")) return;

        const tag = message.content.slice(1);
        
        if (tag === "chevron"){
            return message.channel.send([
                "Chevron are the arrow like icons (^) embedded in your candle meter. Each player will begin the day (sky time) with three chevrons. The number of chevrons will be reduced by one when 5, 10, and 15 candles worth of wax are collected. When 20 candles worth of wax are collected, the candle meter will turn gray. Chevron will reset alongside the daily reset.",
                "",
                "See also: `!chevron-wax`, `/when reset`",
            ].join("\n"),);
        };

        if (tag === "chevron-wax"){
            return message.channel.send([
                "**Wax Conversion** (Treasure Candles = Cake Candles)",
                "",
                "* Level 3 - Each candle requires 1.88 Treasure Candles worth of wax to forge.",
                "* Level 2 - Each candle requires 2.78 Treasure Candles worth of wax to forge.",
                "* Level 1 - Each candle requires 3.56 Treasure Candles worth of wax to forge.",
                "* No Chevron - First 2 candle requires 4.26 Treasure Candles worth of wax to forge. Succeeding candles requires 4.76, 9.76, and 19.76 Treasure Candles worth of wax to forge.",
                "* Gray Meter - First candle requires 40 Treasure Candles worth of wax to forge. Succeeding candles requires double the amount. (i.e. 80, 160)",
                "",
                "A player needs 83.9 Treasure Candles worth of wax to reach the Gray Meter.",
                "",
                "See also: `!chevron`"
            ].join("\n"),);
        };

        if (tag === "complete"){
            return message.channel.send([
                "Completion costs by realm:",
                "",
                "* Isle: 42 Candles, 12 Hearts, 3 Ascended Candles",
                "* Prairie: 122 Candles, 39 Hearts, 13 Ascended Candles",
                "* Forest: 145 Candles, 108 Hearts, 16 Ascended Candles",
                "* Valley: 107 Candles, 124 Hearts, 15 Ascended Candles",
                "* Wasteland: 111 Candles, 142 Hearts, 14 Ascended Candles",
                "* Vault: 104 Candles, 155 Hearts, 14 Ascended Candles",
                "* Elders: 0 Candles, 0 Hearts, 35 Ascended Candles",
                "",
                "Total Cost: 631 Candles, 580 Hearts, 110 Ascended Candles",
            ].join("\n"),);
        }
    },
};