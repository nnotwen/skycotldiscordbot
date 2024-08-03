'use strict'

const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { DateTime, Duration } = require('luxon');
const { timedEvents: evt } = require('../util/constants.js');
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
            .setDescription('How much time is left before the next geyser event (Daylight Prairie/Sanctuary Islands).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('grandma')
            .setDescription('How much time is left before the next grandma event (Hidden Forest/Elevated Clearing).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('turtle')
            .setDescription('How much time is left before the next turtle event (Daylight Prairie/Sanctuary Islands).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('skater')
            .setDescription('How much time is left before the next skater event (Valley of Triumph/Village of Dreams).')
        )
        .addSubcommand(subcommand => subcommand
            .setName('eden-reset')
            .setDescription('How much time is left before the Eye of Eden resets (Weekly).')
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

        if (subcommand === "eden-reset"){
            seconds = date.plus({ seconds: (7 - time.weekday) * 864e2 }).diffNow().as('seconds');
        } else {
            const fromNow = Math.abs(date.plus(evt[subcommand].offset).diffNow().as('seconds'));
            const interval = Duration.fromObject(evt[subcommand].interval).as('seconds');
            seconds = interval - (fromNow % interval);
            elapsed = Duration.fromObject(evt[subcommand].duration ?? {}).plus({ seconds }).as("seconds") - interval;

            if (subcommand === "skater" && time.weekday < 6){
                seconds += Duration.fromObject({ day: 5 - time.weekday }).as('seconds');     
            };
        };

        if (subcommand === "reset"){
            return interaction.reply({
                content: `Sky clock will reset in about **${Duration.fromObject({ seconds }).toFormat("h 'hour(s) and' m 'minute(s)'")}**.`,
                components: [ new ActionRowBuilder().addComponents(button), ],
            });
        };

        if (subcommand === "eden-reset"){
            return interaction.reply({
                content: `Eye of Eden will reset in about **${Duration.fromObject({ seconds }).toFormat(`${seconds > 864e2 ? "d 'day(s),' " : " "}h 'hour(s) and' m 'minute(s)'`)}**.`
            })
        }

        const description = elapsed > 0
            ? `This event started **${moment.duration(Duration.fromObject(evt[subcommand].duration).minus({ seconds: elapsed }).as("seconds"), 'seconds').humanize()} ago** and will end in **${moment.duration(elapsed, 'seconds').humanize()}**.`
            : `This event will start in about **${Duration.fromObject({ seconds }).toFormat(`${seconds > 864e2 ? "d 'day(s),' " : " "}h 'hour(s) and' m 'minute(s)'`)}**.`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Social Light Timed Events" })
            .setThumbnail(evt[subcommand].imageURL)
            .setTitle(evt[subcommand].name)
            .setDescription(description)
            .setColor(0xafeeee).addFields(
                { name: "Location", value: evt[subcommand].location },
                { name: "Maximum rewards on first attempt", value: `${Number((evt[subcommand].maximumReward / 50).toFixed(2))} Candle Cakes worth of wax.` },
                { name: "Note", value: `Event limits may apply ([?](${evt[subcommand].url})).`}
            );

        return interaction.reply({
            embeds: [ embed ],
            components: [ new ActionRowBuilder().addComponents(button), ],
        });
    }
};