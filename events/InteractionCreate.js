'use strict'

const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: (client, interaction) => {
        
        if (interaction.isChatInputCommand()){
            const command = client.commands.get(interaction.commandName);
            
            if (!command){
                return interaction.reply({
                    content: `Command ${interaction.commandName} not found!`,
                    ephemeral: true,
                });
            };

            return command.execute(client, interaction);
        };
    }
}