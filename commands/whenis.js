'use strict'

const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { DateTime, Duration } = require('luxon');
const { timedEvents: evt, Emoji } = require('../util/constants.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('when')
        .setDescription('Gives countdown to specific sky events.')
        .addSubcommand(subcommand => subcommand
            .setName('reset')
            .setDescription('How much time is left before the next daily reset.')
        )
        .addSubcommand(subcommand => subcommand
            .setName('geyser')
            .setDescription('Polluted Geyser event (Daylight Prairie/Sanctuary Islands).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('grandma')
            .setDescription('Grandma\'s Dinner event (Hidden Forest/Elevated Clearing).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('turtle')
            .setDescription('Sanctuary Turtle event (Daylight Prairie/Sanctuary Islands).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('skater')
            .setDescription('Dream Skater event (Valley of Triumph/Village of Dreams).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('aurora')
            .setDescription('Aurora concert (Valley of Triumph/Village of Dreams).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('fireworks')
            .setDescription('Aviary Fireworks Show (Aviary Village).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('fairy-ring')
            .setDescription('Fairie Ring (Daylight Prairie/Prairie Village).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('forest-rainbow')
            .setDescription('Forest\'s Brook Rainbow (Hidden Forest/Forest\'s Brook).')
        ),
    execute: (_client, interaction) => {

        const subcommand = interaction.options.getSubcommand();
        const time = DateTime.now().setZone('America/Los_Angeles')
        const date = time.startOf('day');
        let seconds, elapsed = 0;
        
        const button = new ButtonBuilder()
            .setLabel("What's this?")
            .setURL(evt[subcommand].url) // Every entry on constants/timedEvents must have a url property!
            .setStyle(ButtonStyle.Link);

        const fromNow = Math.abs(date.plus(evt[subcommand].offset).diffNow().as('seconds'));
        const interval = Duration.fromObject(evt[subcommand].interval).as('seconds');
        seconds = interval - (fromNow % interval);
        elapsed = Duration.fromObject(evt[subcommand].duration ?? {}).plus({ seconds }).as("seconds") - interval;

        if (subcommand === "skater" && time.weekday < 6){
            seconds += Duration.fromObject({ day: 5 - time.weekday }).as('seconds');     
        };
        
        if (subcommand === "reset"){
            return interaction.reply({
                content: `Sky clock will reset in about **${Duration.fromObject({ seconds }).toFormat(durationFormat(seconds))}**.`,
                components: [ new ActionRowBuilder().addComponents(button), ],
            });
        };

        const description = elapsed > 0
            ? `This event started **${moment.duration(Duration.fromObject(evt[subcommand].duration).minus({ seconds: elapsed }).as("seconds"), 'seconds').humanize()} ago** and will end in **${moment.duration(elapsed, 'seconds').humanize()}**.`
            : `This event will start in **${Duration.fromObject({ seconds }).toFormat(durationFormat(seconds))}**.`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: evt[subcommand].type })
            .setThumbnail(evt[subcommand].imageURL)
            .setTitle(evt[subcommand].name)
            .setDescription(description)
            .setColor(0xafeeee).addFields(
                {
                    name: "Location",
                    value: evt[subcommand].location, 
                },
                {
                    name: "Maximum rewards on first attempt",
                    value: evt[subcommand].maximumReward 
                        ? `${Emoji.TreasureCandles}x ${Number((evt[subcommand].maximumReward / 50).toFixed(2))} (*or ${Emoji.PieceOfLight}x ${evt[subcommand].maximumReward}*).` 
                        : "No rewards for this event.", 
                },
                {
                    name: "Note",
                    value: evt[subcommand].note ?? "No additional note.",
                },
            );

        if (subcommand === "fireworks" && !time.startOf('month').equals(date)){
            const remaining = time.endOf('month').diffNow().as('seconds');
            embed.setDescription(`This event will start in about **${Duration.fromObject({ seconds: remaining }).toFormat(durationFormat(remaining))}**.`);
        };

        return interaction.reply({
            embeds: [ embed ],
            components: [ new ActionRowBuilder().addComponents(button), ],
        });
    }
};

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