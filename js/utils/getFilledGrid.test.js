const getFilledGrid = require("./getFilledGrid.js");
it('Filled grid', async () => {
    const result = await getFilledGrid(3);
    expect(result).toEqual([[3, 3, 3], [3, 3, 3], [3, 3, 3]]);
});

it('Value zero or lower', async () => {
    const result = await getFilledGrid(-1);
    expect(result).toEqual(null);
});

module.exports = getFilledGrid;