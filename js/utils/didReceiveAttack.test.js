const didReceiveAttack = require("./didReceiveAttack.js");
it('Not a missed shot', async () => {
    const result = await didReceiveAttack([{ x: 2, y: 1 }, { x: 2, y: 2 }], { x: 2, y: 3 });
    expect(result).toEqual(true);
});

it('Missed shot', async () => {
    const result = await didReceiveAttack([{ x: 2, y: 1 }, { x: 2, y: 2 }], { x: 2, y: 1 });
    expect(result).toEqual(true);
});

module.exports = didReceiveAttack;