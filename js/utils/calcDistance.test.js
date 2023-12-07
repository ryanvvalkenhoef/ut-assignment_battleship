const calcDistance = require("./calcDistance.js");
it('Distance', () => {
    const result = calcDistance({ x: 0, y: 0 }, { x: 2, y: 2 });
    console.log({ distance: result });
    expect(result).toEqual(2.8284271247461903);
});

module.exports = calcDistance;