const assignShip = require("./assignShip.js");
it('Ship', async () => {
    const result = await assignShip(
        Ship(`2224`,
            { start: { x: 2, y: 2 }, end: { x: 2, y: 4 } },
            calcDistance({ x: 2, y: 2 }, { x: 2, y: 4 }),
            0));
    expect(result).toEqual(Ship('2224', { start: { x: 2, y: 2 }, end: { x: 2, y: 4 } }, 2, 0));
});
it('No distance specified', async () => {
    const result = await assignShip(
        Ship(`2224`,
            { start: { x: 2, y: 2 }, end: { x: 2, y: 4 } },
            calcDistance({ x: 2, y: 2 }, { x: 2, y: 4 }),
            0));
    expect(result).toEqual(Ship('1111', { start: { x: 1, y: 1 }, end: { x: 1, y: 1 } }, 1, 0));
});

module.exports = assignShip;