// loads the env file
require('dotenv').config();

const { REST, Routes } = require('discord.js');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

const commands = [];
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

const jsfilter = f => f.split('.').pop() === 'js';
for (const commandName of readdirSync(join(__dirname, 'commands')).filter(jsfilter)){
    const commandFile = require(join(__dirname, 'commands', commandName));
    if ('data' in commandFile && 'execute' in commandFile){
        commands.push(commandFile.data.toJSON());
    } else {
        console.log(`[WARNING] ${commandName} is missing the required "data" or "execute" property.`);
    };
};

(async () => {
    try {
        console.log(`[INFO] Refreshing Global Commands.`);
        console.log(`[INFO] Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        )

        console.log(`[INFO] Successfully reloaded ${data.length} application (/) commands.`)
    } catch (error) {
        console.error(error);
    }
})();
