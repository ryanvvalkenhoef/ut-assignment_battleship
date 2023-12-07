export default class Ship {

    constructor(id, position, length, hits) {
        this.id = id;
        this.hasSunk = false
        this.length = length;
        this.hits = hits;
        this.pos = position ?? {};
    }

    hit() { this.hits++; }

    sunk() {
        this.hasSunk = hasSunk(this.length, this.hits);
    }

}