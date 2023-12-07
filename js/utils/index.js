const hasSunk = require('./hasSunk');
const hasHitShip = require("./hasHitShip");
const didReceiveAttack = require('./didReceiveAttack');
const getFilledGrid = require('./getFilledGrid');
const assignShip = require('./assignShip');

module.exports = {
    hasSunk,
    hasHitShip,
    didReceiveAttack,
    getFilledGrid,
    assignShip
}