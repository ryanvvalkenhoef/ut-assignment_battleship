const hasSunk = require("./hasSunk.js");
it('Has sunk', async () => {
    const result = await hasSunk(4, 4);
    expect(result).toEqual(true);
});
it('Has sunk', async () => {
    const result = await hasSunk(3, 1);
    expect(result).toEqual(false);
});
module.exports = hasSunk;