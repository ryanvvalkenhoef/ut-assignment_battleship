const assignShip = require("./assignShip.js");
import calcDistance from './calcDistance.js';
import Ship from '../Ship.js';
import GlobalData from '../GlobalData.js';

const globals = new GlobalData();
const ship = new Ship(`2224`, { start: { x: 2, y: 2 }, end: { x: 2, y: 4 } }, 2, 0);
it('Ship', () => {
    const result = assignShip(globals, ship, null);
    expect(result).toEqual(ship);
});
it('No distance specified', () => {
    const result = assignShip(globals, ship, null);
    expect(result).toEqual(new Ship('1111', { start: { x: 1, y: 1 }, end: { x: 1, y: 1 } }, 1, 0));
});

module.exports = assignShip;