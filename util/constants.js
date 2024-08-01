exports.timedEvents = {
    reset: {
        name: 'Daily Reset',
        interval: { hours: 24 },
        offset: { hours: 0 },
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Sky_Clock",
    },
    geyser: {
        name: 'Polluted Geyser Event',
        interval: { hours: 2 },
        offset: { minutes: 5 },
        duration: { minutes: 10 },
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Polluted_Geyser",
    },
    grandma: {
        name: 'Grandma\'s Dinner Event',
        interval: { hours: 2 },
        offset: { minutes: 35 },
        duration: { minutes: 10 },
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Grandma's_Dinner_Event",
    },
    turtle: {
        name: 'Sunset Sanctuary Turtle Event',
        interval: { hours: 2 },
        offset: { minutes: 50 },
        duration: { minutes: 10 },
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Sunset_Sanctuary_Turtle"
    },
    skater: {
        name: 'Dreams Skater Event',
        interval: { hours: 2 },
        offset: { hours: 1 },
        duration: { minutes: 15 },
        url: "https://sky-children-of-the-light.fandom.com/wiki/Additional_Light_Sources#Dreams_Skater"
    }
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
}

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
}