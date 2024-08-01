'use strict';
const { Events, REST, Routes } = require('discord.js');

module.exports = {
    name: Events.GuildCreate,
    once: false,
    execute: (client, guild) => {
        console.log(`[INFO] Joined ${guild.name}`);
    }
}