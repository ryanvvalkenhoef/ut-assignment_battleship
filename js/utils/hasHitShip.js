function hasHitShip(ships, hitPoint) {
    ships.forEach(hitShip => {
        const distance = calcDistance(hitShip.pos.start, hitShip.pos.end); {
            for (let i = 0; i <= distance; i++) {
                // Calculate the position on the line between the points
                const t = Math.round(i / distance);
                const curPoint = {
                    x: hitShip.pos.start.x + t * (hitShip.pos.end.x - hitShip.pos.start.x),
                    y: hitShip.pos.start.y + t * (hitShip.pos.end.y - hitShip.pos.start.y)
                };
                // Check whether the curPoint is the same as the hit position
                if (curPoint === hitPoint) return hitShip ?? undefined;
            }
        }
    })
};

module.exports = hasHitShip;