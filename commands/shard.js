'use strict'

const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, } = require('discord.js');
const { DateTime, Duration, Interval,  } = require('luxon');
const { skyMaps, skyRealms, mapVarients } = require('../util/constants.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shard')
        .setDescription('Gives detailed description of the current/next shard event.')
        .addSubcommand(subcommand => subcommand
            .setName('red')
            .setDescription('Gives detailed description of the current/next red shard event.')
        )
        .addSubcommand(subcommand => subcommand
            .setName('black')
            .setDescription('Gives detailed description of the current/next black shard event.')
        )
        .addSubcommand(subcommand => subcommand
            .setName('upcoming')
            .setDescription('Gives detailed description of the current/next shard event.')
        ),
    execute: (client, interaction) => {

        // Credits --->
        // https://github.com/PlutoyDev/sky-shards/blob/production/src/data/shard.ts

        const landOffset = Duration.fromObject({ minutes: 8, seconds: 40 });
        const endOffset = Duration.fromObject({ hours: 4 });

        const blackShardInterval = Duration.fromObject({ hours: 8 });
        const redShardInterval = Duration.fromObject({ hours: 6 });

        const realms = ['prairie', 'forest', 'valley', 'wasteland', 'vault'];
        const shardsInfo = [
            {
                noShardWkDay: [6, 7], //Sat;Sun
                interval: blackShardInterval,
                offset: Duration.fromObject({ hours: 1, minutes: 50, }),
                maps: ['prairie.butterfly', 'forest.brook', 'valley.rink', 'wasteland.temple', 'vault.starlight'],
              },
              {
                noShardWkDay: [7, 1], //Sun;Mon
                interval: blackShardInterval,
                offset: Duration.fromObject({ hours: 2, minutes: 10, }),
                maps: ['prairie.village', 'forest.boneyard', 'valley.rink', 'wasteland.battlefield', 'vault.starlight'],
              },
              {
                noShardWkDay: [1, 2], //Mon;Tue
                interval: redShardInterval,
                offset: Duration.fromObject({ hours: 7, minutes: 40, }),
                maps: ['prairie.cave', 'forest.end', 'valley.dreams', 'wasteland.graveyard', 'vault.jelly'],
                defRewardAC: 2,
              },
              {
                noShardWkDay: [2, 3], //Tue;Wed
                interval: redShardInterval,
                offset: Duration.fromObject({ hours: 2, minutes: 20, }),
                maps: ['prairie.bird', 'forest.tree', 'valley.dreams', 'wasteland.crab', 'vault.jelly'],
                defRewardAC: 2.5,
              },
              {
                noShardWkDay: [3, 4], //Wed;Thu
                interval: redShardInterval,
                offset: Duration.fromObject({ hours: 3, minutes: 30, }),
                maps: ['prairie.island', 'forest.sunny', 'valley.hermit', 'wasteland.ark', 'vault.jelly'],
                defRewardAC: 3.5,
              },
        ];

        const overrideRewardAC = {
            'forest.end': 2.5,
            'valley.dreams': 2.5,
            'forest.tree': 3.5,
            'vault.jelly': 3.5,
        };

        const numMapVarients = {
            'prairie.butterfly': 3,
            'prairie.village': 3,
            'prairie.bird': 2,
            'prairie.island': 3,
            'forest.brook': 2,
            'forest.end': 2,
            'valley.rink': 3,
            'valley.dreams': 2,
            'wasteland.temple': 3,
            'wasteland.battlefield': 3,
            'wasteland.graveyard': 2,
            'wasteland.crab': 2,
            'wasteland.ark': 4,
            'vault.starlight': 3,
            'vault.jelly': 2,
        };

        function getShardInfo(date){
            const today = date.setZone('America/Los_Angeles').startOf('day');
            const [dayOfMth, dayOfWk] = [today.day, today.weekday];
            const isRed = dayOfMth % 2 === 1;
            const realmIdx = (dayOfMth - 1) % 5;
            const infoIndex = (dayOfMth % 2 === 1 ? (((dayOfMth - 1) / 2) % 3) + 2 : (dayOfMth / 2) % 2);

            const { noShardWkDay, interval, offset, maps, defRewardAC } = shardsInfo[infoIndex];
            const hasShard = !noShardWkDay.includes(dayOfWk);
            const map = maps[realmIdx];
            const rewardAC = isRed ? overrideRewardAC[map] ?? defRewardAC : undefined;
            const numVarient = numMapVarients[map] ?? 1;
            
            let firstStart = today.plus(offset);
            if (dayOfWk === 7 && today.isInDST !== firstStart.isInDST) {
                firstStart = firstStart.plus({ hours: firstStart.isInDST ? -1 : 1 });
            };

            const occurences = Array.from({ length: 3 }, (_, i) => {
                const start = firstStart.plus(interval.mapUnits(x => x * i));
                const land = start.plus(landOffset);
                const end = start.plus(endOffset);
                return { start, land, end };
            });

            return {
                date,
                isRed,
                hasShard,
                offset,
                interval,
                lastEnd: occurences[2].end,
                realm: realms[realmIdx],
                map,
                numVarient,
                rewardAC,
                occurences,
            };
        };

        function findNextShard(from, opts) {
            const info = getShardInfo(from);
            const { hasShard, isRed, lastEnd } = info;
            const { only } = opts;
            
            if (hasShard && from < lastEnd && (!only || (only === 'red') === isRed)) {
                return info;
            } else {
                return findNextShard(from.plus({ days: 1 }), { only });
            }
        };

        function findNextLand(from){
            const intervals = shard.occurences.map(x => Interval.fromDateTimes(x.land, x.end));
            let response = {}
            for (const [index, interval] of Object.entries(intervals)){
                if (interval.contains(from)){
                    response = {
                        type: 'end', index,
                        time: interval.end.diff(from, 'seconds'),
                    };
                };
            };
            
            if (response.type === 'end'){
                return response;
            };

            for (const [index, interval] of Object.entries(intervals)){
                if (interval.start > from){
                    response = {
                        type: 'land', index,
                        time: interval.start.diff(from, 'seconds')
                    };
                    break;
                };
            };

            return response;
        };

        const subcommand = interaction.options.getSubcommand();
        const shard = findNextShard(DateTime.now().setZone(process.env.TIME_ZONE), { only: subcommand === 'upcoming' ? undefined : subcommand });
        const recent = findNextLand(DateTime.now().setZone(process.env.TIME_ZONE));
        const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);


        const embed = new EmbedBuilder()
            .setAuthor({ 
                name: `${capitalizeFirstLetter(shard.date.setZone(process.env.TIME_ZONE).toRelativeCalendar())}, ${shard.date.toLocaleString(DateTime.DATE_FULL)}`,
                iconURL: `https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/${shard.isRed ? "32/Red-shard-map-icon" : "38/Black-shard-map-icon"}-Ray.png`,
            })
            .setColor(shard.isRed ? 0xd9544d : 0xafeeee)
            .setThumbnail(`https://raw.githubusercontent.com/PlutoyDev/sky-shards/production/public/infographics/map_clement/${shard.map}.webp`)
            .setTitle(`${shard.isRed ? 'Red' : 'Black'} Shard in ${skyRealms[shard.realm + '.long']}, ${skyMaps[shard.map]}`)
            .setDescription(`${recent.index == 0 ? 'First' : recent.index == 1 ? 'Second' : 'Last'} shard ${recent.type === 'end' ? 'already landed and will end in' : 'will land in'} **${moment.duration(recent.time.seconds, 'seconds').humanize()}**.`)
            .addFields(
                { name: "Maximum Rewards", value: shard.isRed ? `${shard.rewardAC} Ascended Candles.` : `4 Candle Cakes worth of wax.`},
            )
            .addFields(shard.occurences.map((occurence, i) => ({
                inline: true,
                name: ["First", "Second", "Third"][i] + " shard",
                value: `<t:${occurence.land.toUnixInteger()}:T> - <t:${occurence.end.toUnixInteger()}:T>`,
            })))
            .setFooter({ text: "Credits: PlutoyDev, Clement" });

        const button = new ButtonBuilder()
        .setLabel("❔ What's this?")
        .setStyle(ButtonStyle.Link)
        .setURL('https://sky-children-of-the-light.fandom.com/wiki/Shard_Eruptions');

        return interaction.reply({ embeds: [embed], components: [new ActionRowBuilder().addComponents(button), ]});
    }
}