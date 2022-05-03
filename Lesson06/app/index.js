const west = "west";
const east = "east";
const north = "north";
const south = "south";


const compass = {
    north: {
        left: west,
        right: east,
    },
    east: {
        left: north,
        right: south,
    },
    south: {
        left: east,
        right: west,
    },
    west: {
        left: south,
        right: north,
    }
};

console.log(compass[compass.west.right]);
console.log(compass[compass.north.left]);


