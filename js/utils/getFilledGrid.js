function getFilledGrid(gridLength) {
    if (gridLength > 0) {
        return [...Array(gridLength)].map(e => Array(gridLength).fill(gridLength));
    } else { return null; }
}

module.exports = getFilledGrid;