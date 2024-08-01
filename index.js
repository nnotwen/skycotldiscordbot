// loads the env file
require('dotenv').config();
require('moment-duration-format');

const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ],
    presence: {
        status: 'dnd',
        activities: [
            {
                name: 'Sky: Children of the Light',
                type: ActivityType.Playing,
            }
        ]
    }
});

const jsfilter = f => f.split('.').pop() === 'js';

for (const eventName of readdirSync(join(__dirname, 'events')).filter(jsfilter)){
    const eventFile = require(join(__dirname, 'events', eventName));
    client[eventFile.once ? 'once' : 'on'](eventFile.name, eventFile.execute.bind(null, client));
};

client.commands = new Collection();
for (const commandName of readdirSync(join(__dirname, 'commands')).filter(jsfilter)){
    const commandFile = require(join(__dirname, 'commands', commandName));
    if ('data' in commandFile && 'execute' in commandFile){
        client.commands.set(commandFile.data.name, commandFile);
    } else {
        console.log(`[WARNING] ${commandName} is missing the required "data" or "execute" property.`);
    };
};

client.once(Events.ClientReady, (client) => {
    console.log(`[INFO] ${client.user.username} is ready!`);
});

client.login(process.env.DISCORD_TOKEN);


// DEBUG
for (const exception of [
    'uncaughtException',
    'unhandledRejection',
    'rejectionHandled'
]) process.on(exception, console.error);