const calcDistance = require("./calcDistance.js");
it('Distance', async () => {
    const result = await calcDistance({ x: 0, y: 0 }, { x: 2, y: 2 });
    expect(result).toEqual(2.8284271247461903);
});

module.exports = calcDistance;