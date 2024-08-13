'use strict';

/**
 * @name preciseRelativeTime
 * @description Parses time (in seconds) to a human readable and precise relative time
 * @param {Number} t The time in seconds
 * @returns {String}
 */
function preciseRelativeTime(t) {
    // Constants | Units
    const day = 86400;
    const hour = 3600;
    const minute = 60;
    let seconds = t;

    const days = Math.floor(seconds/day);
        seconds = seconds % day;
    const hours = Math.floor(seconds/hour);
        seconds = seconds % hour;
    const minutes = Math.floor(seconds/minute);
        seconds = Math.round(seconds % minute);

    return new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
    }).format(Object.entries({days, hours, minutes, seconds})
        .filter(([, val]) => val > 0)
        .map(([unit, val]) => `${val} ${val > 1 ? unit : unit.slice(0, unit.length - 1) }`)
    );
};

module.exports = {
    preciseRelativeTime,
}