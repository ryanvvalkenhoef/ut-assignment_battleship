import calcDistance from './calcDistance.js';
import Ship from '../Ship.js';
function hasHitShip(ships, hitPoint) {
    return ships.forEach(hitShip => {
        let curPoint;
        const distance = calcDistance(hitShip.pos.start, hitShip.pos.end); {
            for (let i = 0; i <= distance; i++) {
                // Calculate the position on the line between the points
                const t = i / distance;
                curPoint = {
                    x: Math.round(hitShip.pos.start.x + t * (hitShip.pos.end.x - hitShip.pos.start.x)),
                    y: Math.round(hitShip.pos.start.y + t * (hitShip.pos.end.y - hitShip.pos.start.y))
                };
                // Check whether the curPoint is the same as the hit position
                const isEqualVec = (a, b) => a.x === b.x && a.y === b.y;
                if (isEqualVec(curPoint, hitPoint)) console.log(hitShip);
                if (isEqualVec(curPoint, hitPoint)) return hitShip;
            }
        }
        console.log({ distance });
    })
};

module.exports = hasHitShip;
