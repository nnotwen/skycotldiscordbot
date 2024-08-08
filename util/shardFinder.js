'use strict';

// Credits --->
// https://github.com/PlutoyDev/sky-shards/blob/production/src/data/shard.ts
const { DateTime, Duration, Interval, } = require('luxon');

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

/**
 * @description Get the shard information for a specific date
 * @param {DateTime} date Date to compare with the shard info
 * @returns 
 */
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

/**
 * 
 * @param {DateTime} from Date to compare with the shard landing
 * @param {Object} opts Options for this function
 * @param {undefined|string} opts.only May be undefined for both shard, red for red shard, and black for black shard.
 * @returns 
 */
function findNextShard(from, opts) {
    const info = getShardInfo(from);
    const { hasShard, isRed, lastEnd } = info;
    const { only } = opts;

    if (hasShard && from < lastEnd && (!only || (only === 'red') === isRed)) {
        return info;
    } else {
        return findNextShard(from.setZone('America/Los_Angeles').startOf('day').plus({ days: 1 }), { only });
    }
};

/**
 * 
 * @param {DateTime} from The date to compare the next land 
 * @param {Object} shard The shard information to use
 * @returns 
 */
function findNextLand(from, shard){
    const intervals = shard.occurences.map(x => Interval.fromDateTimes(x.land, x.end));

    // Checking for every interval if a shard has currently landed
    for (const [index, interval] of Object.entries(intervals)){
        if (interval.contains(from)){
            return { 
                start: interval.start,
                end: interval.end,
                diffStart: interval.start.diff(from, 'seconds'),
                diffEnd: interval.end.diff(from, 'seconds'),
                index, 
                type: 'end',
            };
        };
    };

    // If shard hasn't landed, check the next shard landing event
    for (const [index, interval] of Object.entries(intervals)){
        if (interval.start > from){
            return {
                start: interval.start,
                end: interval.end,
                diffStart: interval.start.diff(from, 'seconds'),
                diffEnd: interval.end.diff(from, 'seconds'),
                index,
                type: 'land',
            };
        };
    };
};

module.exports = {
    getShardInfo,
    findNextShard,
    findNextLand,
}