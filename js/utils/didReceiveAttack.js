function didReceiveAttack(missedShots, x, y) {
    return !missedShots.includes({ x: x, y: y });
}

module.exports = didReceiveAttack;