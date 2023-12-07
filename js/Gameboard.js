import './Ship.js';
class Gameboard {

    constructor(globals) {
        this.globals = globals;

        // Grid container properties
        this.container = this.gridContainer;

        // Gameboard properties
        this.ships = [];
        this.missedShots = [];

        this.appendGridCells();
    }

    static get colors() {
        return colors;
    }

    // >*< Grid container (DOM) methods >*<
    get gridContainer() {
        const dominator = new Dominator(Templates.gridContainer(this));
        const div = dominator.domElement;
        this.container = div;
        return div;
    }

    appendGridCells() {
        this.globals.globalVariables['gridCells'] = [];
        const len = this.globals.getGlobalVariable('gridLength');
        for (let y = 0; y < len; y++) {
            for (let x = 0; x < len; x++) {
                const index = this.globals.getGlobalVariable('gridCells').length;
                const cell = new gridCell(`c${x}-${y}`, colors['white'], colors['black'], true, false, false, { x: x, y: y }, index, globals);
                this.globals.globalVariables['gridCells'].push(cell);
                let element = this.globals.globalVariables['gridCells'][index].element;
                this.container.appendChild(element);
            }
        }
    }

    // >*< Gameboard methods >*<
    receiveAttack(x, y) {
        // takes a pair of coordinates
        // determines whether or not the attack hit a ship
        const hitShip = hasHitShip(this.ships, { x: x, y: y })

        // if hit then sends the ‘hit’ function to the correct ship
        if (hitShip) {
            hitShip.hit()
        } else { // else record the coordinates of the missed shot
            this.missedShots.push({ x: x, y: y })
        }

        return didReceiveAttack(this.missedShots, x, y);

    }

    shipFactory(start, end) {
        const distance = calcDistance(start, end); {
            // Create new ship with an id, position, length and hits
            let ship = new Ship(`${start.y}${start.x}${end.y}${end.x}`, { start: start, end: end }, distance, 0);
            assignShip(this.globals, ship, distance);
            this.ships.push(ship);
        }
    }
}