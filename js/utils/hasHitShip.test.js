const hasHitShip = require("./hasHitShip.js");
import Ship from '../Ship.js';

const ships = [new Ship('2224', { start: { x: 2, y: 2 }, end: { x: 2, y: 4 } }, 2, 0)];
const hitPoints = { x: 2, y: 2 };
it('Hitship', () => {
    const result = hasHitShip(
        ships,
        hitPoints
    );
    console.log(hasHitShip(
        ships,
        hitPoints
    ));
    expect(result).toEqual(new Ship('2224', { start: { x: 2, y: 2 }, end: { x: 2, y: 4 } }, 2, 0));
});

module.exports = hasHitShip;