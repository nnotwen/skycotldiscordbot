'use strict';
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildCreate,
    once: false,
    execute: (client, guild) => {
        console.log(`[INFO] Joined ${guild.name}`);
    }
}