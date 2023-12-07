const hasHitShip = require("./hasHitShip.js");
const
    it('Hitship', async () => {
        const result = await hasHitShip(
            [Ship('2224', { start: { x: 2, y: 2 }, end: { x: 2, y: 4 } }, 2, 0)],
            { x: 1, y: 1 }
        );
        expect(result).toEqual(Ship('2224', { start: { x: 2, y: 2 }, end: { x: 2, y: 4 } }, 2, 0) ?? undefined);
    });

module.exports = hasHitShip;