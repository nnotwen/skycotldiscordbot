'use strict';

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { DateTime, Duration } = require('luxon');
const { Emoji } = require('../util/constants.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eden')
        .setDescription("Gives information on Eye of Eden (Spoiler Warning)"),
    execute: (_client, interaction) => {

        const time = DateTime.now().setZone('America/Los_Angeles');
        const date = time.startOf('day');

        // Reset Data
        const elapsed = Math.abs(date.minus({ day: date.weekday == 7 ? 0 : date.weekday }).diffNow().as('seconds'));
        const remaining = Duration.fromObject({ days: 7 }).as('seconds') - elapsed;

        // Reward Data
        const statueAC = 0.25;

        const embed = new EmbedBuilder()
            .setTitle('Eye of Eden (Storm)')
            .setColor(0xd9544d)
            .setThumbnail('https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/e5/Eden_2.png')
            .setDescription(`**${moment.duration(elapsed, 'seconds').humanize()}** has passed since last reset. Next reset will be in **${Duration.fromObject({ seconds: remaining }).toFormat(durationFormat(remaining))}**.`)
            .addFields(
                { 
                    name: 'Maximum Rewards',
                    value: `${Emoji.AscendedCandle}x ${63 * statueAC}`
                },
                {
                    name: 'Bonus Rewards',
                    value: `${Emoji.AscendedCandle}x 0.5 for not skipping ascension cutscene.`}
            );

        const button = new ButtonBuilder()
            .setLabel("What is Eye of Eden? (Spoiler Warning)")
            .setStyle(ButtonStyle.Link)
            .setURL('https://sky-children-of-the-light.fandom.com/wiki/Eye_of_Eden');

        return interaction.reply({ embeds: [embed], components: [new ActionRowBuilder().addComponents(button,), ], });

    }
}

function durationFormat(seconds){
    if (seconds > 864e2){
        return "d 'day(s),' h 'hour(s) and' m 'minute(s)'";
    } else if (seconds > 36e2){
        return "h 'hour(s) and' m 'minute(s)'";
    } else if (seconds < 60) {
        return "s 'second(s)'";
    } else {
        return "m 'minute(s)'"
    };
}