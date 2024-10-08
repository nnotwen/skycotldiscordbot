'use strict';

exports.Emoji = {
    AscendedCandle: "<:ascended_candle:1271811868864020571>",
    TreasureCandles: "<:treasure_candles:1271811687820955728>",
    PieceOfLight: "<:piece_of_light:1271810948444983450>",
}

exports.timedEvents = {
    reset: {
        name: 'Daily Reset',
        interval: { hours: 24 },
        offset: { hours: 0 },
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Sky_Clock",
    },
    geyser: {
        name: 'Polluted Geyser Event',
        type: "Social Light Timed Event",
        interval: { hours: 2 },
        offset: { minutes: 5 },
        duration: { minutes: 10 },
        maximumReward: 350,
        location: "Daylight Prairie > Sanctuary Islands",
        imageURL: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/bd/Wax-prairie-sanctuary-days-of-nature-2021.jpg",
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Polluted_Geyser",
        note: "Daily limit of 1000 lights (20 Candle Cakes) applies.",
    },
    grandma: {
        name: 'Grandma\'s Dinner Event',
        type: "Social Light Timed Event",
        interval: { hours: 2 },
        offset: { minutes: 35 },
        duration: { minutes: 10 },
        maximumReward: 540,
        location: "Hidden Forest > Elevated Clearing > Ancestor’s Table of Belonging",
        imageURL: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/e/ea/Wax-social-light-grandma-dinner.jpg",
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Grandma's_Dinner_Event",
        note: "Tied daily limit of 1000 lights (20 Candle Cakes) with Sunset Sanctuary Turtle Event applies.",
    },
    turtle: {
        name: 'Sunset Sanctuary Turtle Event',
        type: "Social Light Timed Event",
        interval: { hours: 2 },
        offset: { minutes: 50 },
        duration: { minutes: 10 },
        maximumReward: 337,
        location: "Daylight Prairie > Sanctuary Islands",
        imageURL: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/1/1d/Wax-social-light-prairie-sanctuary-turtle.png",
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Sunset_Sanctuary_Turtle",
        note: "Tied daily limit of 1000 lights (20 Candle Cakes) with Grandma's Dinner Event applies.",
    },
    skater: {
        name: 'Dreams Skater Event',
        type: "Social Light Timed Event",
        interval: { hours: 2 },
        offset: { hours: 1 },
        duration: { minutes: 15 },
        maximumReward: 140,
        location: "Valley of Triumph > Village of Dreams > Ice Rink",
        imageURL: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a4/Wax-social-light-valley-village-dreams-skater.png",
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Dreams_Skater",
        note: "Daily limit of 400 lights (8 Candle Cakes) applies.",
    },
    aurora: {
        name: "Aurora Concert",
        type: "Special Event",
        interval: { hours: 4 },
        offset: { hours: 2 },
        duration: { minutes: 45 },
        location: "Valley of Triumph > Coliseum",
        imageURL: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/7b/AURORA-Concert-Inter-1-Stage.png",
        url: "https://sky-children-of-the-light.fandom.com/wiki/AURORA_Concert",
        note: "[Aurora cape](https://sky-children-of-the-light.fandom.com/wiki/AURORA_Concert#Wings_of_AURORA) is required to participate.",
    },
    fireworks: {
        name: "Aviary's Firework Show",
        type: "Special Event",
        interval: { hours: 4 },
        offset: { },
        duration: { minutes: 10 },
        location: "Aviary Village",
        imageURL: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/4/4e/Aviary%E2%80%99s-Firework-Festival-promo-image.png",
        url: "https://bit.ly/SkyPatch0235",
        note: "Meditate at the shrine near the realm gates to join.",
    },
    "fairy-ring": {
        name: "Fairy (Faerie Ring)",
        type: "Regular Event",
        interval: { hours: 1 },
        offset: { minutes: 50 },
        duration: { minutes: 10 },
        location: "Daylight Prairie > Prairie Village",
        imageURL: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/80/Faeriering.JPG",
        url: "https://sky-children-of-the-light.fandom.com/wiki/Daylight_Prairie#Easter_Eggs",
        note: "Appears on the hill above the Eight-Player Puzzle room.",
    },
    "forest-rainbow": {
        name: "Forest's Brook Rainbow",
        type: "Regular Event",
        interval: { hours: 12 },
        offset: { hours: 5 },
        duration: { minutes: 30 },
        location: "Hidden Forest > Forest's Brook",
        imageURL: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/28/Forest_rainbow.png",
        url: "https://sky-children-of-the-light.fandom.com/wiki/Hidden_Forest#Easter_Eggs",
        note: "Appears above the entrance to Elevated Clearing.",
    },
}

exports.skyRealms = {
    "prairie.long": "Daylight Prairie",
    "prairie.short": "Prairie",
    "forest.long": "Hidden Forest",
    "forest.short": "Forest",
    "valley.long": "Valley of Triumph",
    "valley.short": "Valley",
    "wasteland.long": "Golden Wasteland",
    "wasteland.short": "Wasteland",
    "vault.long": "Vault of Knowledge",
    "vault.short": "Vault"
};

exports.skyMaps = {
    "prairie.butterfly": "Butterfly Fields",
    "prairie.village": "Village Islands",
    "prairie.cave": "Cave",
    "prairie.bird": "Bird Nest",
    "prairie.island": "Sanctuary Island",
    "forest.brook": "Brook",
    "forest.boneyard": "Boneyard",
    "forest.end": "Forest Garden",
    "forest.tree": "Treehouse",
    "forest.sunny": "Elevated Clearing",
    "valley.rink": "Ice Rink",
    "valley.dreams": "Village of Dreams",
    "valley.hermit": "Hermit valley",
    "wasteland.temple": "Broken Temple",
    "wasteland.battlefield": "Battlefield",
    "wasteland.graveyard": "Graveyard",
    "wasteland.crab": "Crab Field",
    "wasteland.ark": "Forgotten Ark",
    "vault.starlight": "Starlight Desert",
    "vault.jelly": "Jellyfish Cove"
};

exports.mapVarients = {
    "prairie.butterfly.0": "On top of the dome",
    "prairie.butterfly.1": "Leaning to the left side",
    "prairie.butterfly.2": "Leaning to the right side",
    "prairie.village.0": "On the center island",
    "prairie.village.1": "Left of Koi Pond",
    "prairie.village.2": "Right of Koi Pond",
    "prairie.bird.0": "On the sloped island",
    "prairie.bird.1": "Beside the lower ruins",
    "prairie.island.0": "Next to manta statues",
    "prairie.island.1": "Near turtle island",
    "prairie.island.2": "Near the waterfall",
    "forest.brook.0": "Right of exit",
    "forest.brook.1": "Outside of pipes",
    "forest.end.0": "Left from exit of temple",
    "forest.end.1": "Far right of temple",
    "valley.rink.0": "Far left from entrance",
    "valley.rink.1": "Near exit to sliding race",
    "valley.rink.2": "Left from the entrance",
    "valley.dreams.0": "Smaller ice rink",
    "valley.dreams.1": "Close to Dream's Guide",
    "waseland.temple.0": "Center of the area",
    "wasteland.temple.1": "Far left of the area",
    "wasteland.temple.2": "Far right of the area",
    "wasteland.battlefield.0": "Front-left of the center ruins",
    "wasteland.battlefield.1": "Front-right of the center ruins",
    "wasteland.battlefield.2": "Back-left of the center ruins",
    "wasteland.graveyard.0": "Right of entrance of the area",
    "wasteland.graveyard.1": "Left of exit to battlefield",
    "wasteland.crab.0": "Far right from the entrance perspective",
    "wasteland.crab.1": "Left from the entrance perspective",
    "wasteland.ark.0": "Close to the pond",
    "wasteland.ark.1": "Exit of crab cave",
    "wasteland.ark.2": "Beside the half-buried ship",
    "wasteland.ark.3": "Beside the farm",
    "vault.starlight.0": "Next to the rose",
    "vault.starlight.1": "Close to the exit towards Jellyfish Cove",
    "vault.starlight.2": "Right of rose garden",
    "vault.jelly.0": "Near the entrance",
    "vault.jelly.1": "Near the deck"
};

exports.aviaryTimeCycle = {
    baseImageURL: "https://static.wikia.nocookie.net/sky-children-of-the-light/images",
    cycleInterval: { hours: 1, },
    sunrise: {
        name: "Sunrise",
        offset: { },
        duration: { minutes: 10, },
        image: "6/6b/Aviary-Village-Sunrise.png",
    },
    fog: {
        name: "Foggy",
        offset: { minutes: 10, },
        duration: { minutes: 5, },
        image: "5/58/Aviary-Village-Fog.png",
    },
    daytime: {
        name: "Daytime",
        offset: { minutes: 15, },
        duration: { minutes: 25, },
        image: "a/aa/Aviary-Village-Daytime.png",
    },
    sunset: {
        name: "Sunset",
        offset: { minutes: 40, },
        duration: { minutes: 10, },
        image: "f/f7/Aviary-Village-Sunset.png",
    },
    night: {
        name: "Nighttime",
        offset: { minutes: 50, },
        duration: { minutes: 10, },
        image: "6/67/Aviary-Village-Nighttime.png",
    },
};