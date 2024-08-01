'use strict'

const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { DateTime, Duration } = require('luxon');
const { timedEvents: evt } = require('../util/constants.js');

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
        const date = DateTime.now().setZone('America/Los_Angeles').startOf('day');
        const btn_info = new ButtonBuilder()
            .setLabel("❔ What's this?")
            .setURL(subcommand === "eden-reset" ? "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/590-what-is-eye-of-eden/" : evt[subcommand].url)
            .setStyle(ButtonStyle.Link)

        if (subcommand === 'eden-reset'){
            const offset = (7 - new Date().getDay()) * 864e2
            const seconds = date.plus(Duration.fromObject({ seconds: offset })).toUnixInteger() - DateTime.now().toUnixInteger();

            return interaction.reply({
                content: `The **Eye of Eden** will reset in about ${Duration.fromObject({ seconds }).toFormat("d 'day(s)' h 'hour(s) and' m 'minute(s)'")}.`,
                components: [
                    new ActionRowBuilder()
                    .addComponents(btn_info)
                ],
            });
        };

        const a = DateTime.now().toUnixInteger();
        const b = date.plus(Duration.fromObject(evt[subcommand].offset)).toUnixInteger();
        const c = Duration.fromObject(evt[subcommand].interval).as('seconds');

        const seconds = c-((a-b)%c);

        if ((seconds + Duration.fromObject(evt[subcommand].duration ?? {}).as('seconds')) > c){
            return interaction.reply({
                content: `The **${evt[subcommand].name}** is currently happening!`,
                components: [
                    new ActionRowBuilder()
                    .addComponents(btn_info)
                ]
            });
        } else {
            return interaction.reply({
                content: `The next **${evt[subcommand].name}** will start in about ${Duration.fromObject({ seconds }).toFormat("h 'hour(s) and' m 'minute(s)'")}.`,
                components: [
                    new ActionRowBuilder()
                    .addComponents(btn_info)
                ],
            });
        }
    }
};