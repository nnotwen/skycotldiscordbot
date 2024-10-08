'use strict'

const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, } = require('discord.js');
const { DateTime } = require('luxon');
const { skyMaps, skyRealms, Emoji, } = require('../util/constants.js');
const { findNextShard, findNextLand, getShardInfo } = require('../util/shardFinder.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shard')
        .setDescription('Gives basic information of the shard eruption event.')
        .addStringOption(option => option
            .setName('type')
            .setDescription('The type of the shard eruption event.')
            .addChoices(
                { name: 'Strong Eruption (Red Shard)', value: 'red' },
                { name: 'Regular Eruption (Black Shard)', value: 'black' },
            )
        ),
    execute: (_client, interaction) => {

        // Credits --->
        // https://github.com/PlutoyDev/sky-shards/blob/production/src/data/shard.ts

        const only = interaction.options.getString('type');
        const shard = findNextShard(DateTime.now(), { only });
        const recent = findNextLand(DateTime.now(), shard);
        const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

        const embed = new EmbedBuilder()
            .setAuthor({ 
                name: `${capitalizeFirstLetter(recent.start.setZone(process.env.TIME_ZONE).toRelativeCalendar())}, ${recent.start.setZone(process.env.TIME_ZONE).toLocaleString(DateTime.DATE_FULL)}`,
                iconURL: `https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/${shard.isRed ? "32/Red-shard-map-icon" : "38/Black-shard-map-icon"}-Ray.png`,
            })
            .setColor(shard.isRed ? 0xd9544d : 0xafeeee)
            .setThumbnail(`https://raw.githubusercontent.com/PlutoyDev/sky-shards/production/public/infographics/map_clement/${shard.map}.webp`)
            .setTitle(`${shard.isRed ? 'Red' : 'Black'} Shard in ${skyRealms[shard.realm + '.long']}, ${skyMaps[shard.map]}`)
            .setDescription(`${recent.index == 0 ? 'First' : recent.index == 1 ? 'Second' : 'Last'} shard ${recent.type === 'end' ? `landed **${moment.duration(recent.diffStart.seconds, 'seconds').humanize()} ago** and will end in **${moment.duration(recent.diffEnd.seconds, 'seconds').humanize()}**.` : `will land in **${moment.duration(recent.diffStart.seconds, 'seconds').humanize()}**.`} `)
            .addFields({
                    name: "Maximum Rewards",
                    value: shard.isRed 
                        ? `${Emoji.AscendedCandle}x ${shard.rewardAC}` 
                        : `${Emoji.TreasureCandles}x 4 (*or ${Emoji.PieceOfLight}x 200*)`
                },)
            .addFields(shard.occurences.map((occurence, i) => ({
                inline: true,
                name: ["First", "Second", "Last"][i] + " shard",
                value: `<t:${occurence.land.toUnixInteger()}:T> - <t:${occurence.end.toUnixInteger()}:T>`,
            })));

        const button1 = new ButtonBuilder()
        .setLabel("What's a shard eruption?")
        .setStyle(ButtonStyle.Link)
        .setURL('https://sky-children-of-the-light.fandom.com/wiki/Shard_Eruptions');

        const button2 = new ButtonBuilder()
        .setLabel("More info")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://sky-shards.pages.dev/en/${shard.date.toFormat('yyyy/LL/dd')}`);

        return interaction.reply({ embeds: [embed], components: [new ActionRowBuilder().addComponents(button1, button2), ]});
    }
}