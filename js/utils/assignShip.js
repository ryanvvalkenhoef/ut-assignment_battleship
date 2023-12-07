function assignShip(shipPart, distance) {
    let distanceNum = distance || calcDistance(shipPart.start, shipPart.end);
    const grid = globals.getGlobalVariable('grid');
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
    return shipPart;
}

module.exports = assignShip;