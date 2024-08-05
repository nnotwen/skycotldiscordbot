'use strict';

const { SlashCommandBuilder, EmbedBuilder, } = require('discord.js');
const { DateTime, Duration, Interval } = require('luxon');
const moment = require('moment');
const { aviaryTimeCycle: ATC } = require('../util/constants.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aviary-time')
        .setDescription("Aviary Village Day/Night Cycle"),
    execute: (_client, interaction) => {

        const time = DateTime.now().setZone('America/Los_Angeles');
        const date = time.startOf('day');
        const data = [ ATC.sunrise, ATC.fog, ATC.daytime, ATC.sunset, ATC.night ].map(x => {
            const hour = Math.floor(Interval.fromDateTimes(date, time).length('seconds') / Duration.fromObject({ hour: 1 }).as('seconds'));
            const fromDate = date.plus(Duration.fromObject({ hour }).plus(x.offset));
            const toDate = fromDate.plus(x.duration);
            const isCurrent = Interval.fromDateTimes(fromDate, toDate).contains(time);

            return { ...x, fromDate, toDate, isCurrent };
        });

        const currentIndex = data.findIndex(x => x.isCurrent);
        const current = data[currentIndex];

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Aviary Village Day/Night Cycle" })
            .setColor(0xafeeee)
            .setThumbnail(`${ATC.baseImageURL}/${current.image}`)
            .setDescription(`It is currently **${current.name}** in Aviary Village.`)
            .addFields([
                {
                    name: (data[currentIndex - 1] ?? [...data].pop()).name,
                    value: `Ended **${moment.duration(current.fromDate.diffNow().as('milliseconds')).humanize()}** ago.`,
                },
                {
                    name: (data[currentIndex + 1] ?? [...data].shift()).name,
                    value: `Will start in **${moment.duration(current.toDate.diffNow().as('milliseconds')).humanize()}**.`,
                },
            ]);

        return interaction.reply({ embeds: [embed], });

    }
};