import calcDistance from './calcDistance.js';
function assignShip(globals, shipPart, distance) {
    console.log(shipPart, 'shipPart');
    console.log(globals, 'globals');
    const grid = globals.getGlobalVariable('grid');
    let distanceNum = distance || calcDistance(shipPart.pos.start, shipPart.pos.end);
    for (let i = 0; i <= distanceNum; i++) {
        // Calculate the position on the line between the points
        const t = i / distanceNum;
        const curPoint = {
            x: Math.round(shipPart.pos.start.x + t * (shipPart.pos.end.x - shipPart.pos.start.x)),
            y: Math.round(shipPart.pos.start.y + t * (shipPart.pos.end.y - shipPart.pos.start.y))
        };
        // Check whether the calculated position falls within the border
        if (curPoint.x >= 0 && curPoint.x < grid[0].length &&
            curPoint.y >= 0 && curPoint.y < grid.length) {
            // Fill in the grid on the calculated position
            globals.globalVariables['grid'][curPoint.y][curPoint.x] = shipPart;
        }
    }
}

module.exports = assignShip;