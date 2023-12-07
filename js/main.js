import './utils/index.js';
const colors = ['white', 'lightgrey', 'red', 'blue', 'lightpink', 'lightyellow'];

class GlobalData {
    constructor() {
        this.globalVariables = {
            'gridLength': 15,
            'gridCells': []
        };
        // Move grid initialization here
        this.globalVariables['grid'] = getFilledGrid(this.globalVariables['gridLength']);
    }

    // Method to access a global variable
    getGlobalVariable(variableName) {
        return this.globalVariables[variableName];
    }

    // Method to set a global variable
    setGlobalVariable(variableName, value) {
        this.globalVariables[variableName] = value;
    }
}

class Ship {

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

class gridCell {

    constructor(id, color, borderColor, isEnabled, hasDot, hasCross, position, index) {
        this.id = id;
        this.color = color ?? 'white';
        this.hasDot = hasDot ?? false;
        this.hasCross = hasCross ?? false;
        this.isEnabled = isEnabled ?? true;
        this.borderColor = borderColor ?? 'black';
        this.pos = position;
        this.index = index;

        this.element = this.gridCell;
    }

    static get colors() {
        return colors;
    }

    get gridCell() {
        const dominator = new Dominator(Templates.gridCell(this));
        // Add click-event to perform an attack
        dominator.event(this.performAttack.bind(this));
        const elem = dominator.domElement;
        this.element = elem;
        return elem;
    }

    performAttack() {
        this.removeClasses([
            `bg-${this.color}`,
            `border-${this.borderColor}`,
            this.hasCross ? 'hasCross' : undefined,
            this.hasDot ? 'hasDot' : undefined]);
        const isReceived = gameboard.receiveAttack(this.pos.x, this.pos.y);
        if (isReceived) {
            console.log(globals.getGlobalVariable('grid'));
            this.borderColor = colors[2];
            this.color = colors[4];
            this.hasCross = true;
            this.isEnabled = false;
            // Color surrounded cells grey and add dot
            globals.getGlobalVariable('gridCells').forEach(cell => {
                if (cell.pos.x == this.pos.x - 1 && cell.pos.y == this.pos.y - 1
                    || cell.pos.x == this.pos.x + 1 && cell.pos.y == this.pos.y + 1
                    || cell.pos.x == this.pos.x + 1 && cell.pos.y == this.pos.y - 1
                    || cell.pos.x == this.pos.x - 1 && cell.pos.y == this.pos.y + 1) {
                    cell.element.classList.remove(`bg-${cell.color}`);
                    cell.element.classList.remove(cell.hasDot ? 'hasDot' : undefined);
                    cell.color = colors[1];
                    cell.hasDot = true;
                    cell.isEnabled = false;
                    cell.element.classList.add(`bg-${cell.color}`);
                    cell.element.classList.add(cell.hasDot ? 'hasDot' : undefined);
                }
            });
            const hitShip = globals.getGlobalVariable('grid')[this.pos.y][this.pos.x];
            const len = globals.getGlobalVariable('gridLength');
            let startIndex, endIndex;
            if (hasSunk(hitShip.length, hitShip.hits)) {
                if (hitShip.pos.start.x == hitShip.pos.end.x) { // Horizontal ship
                    startIndex = len * hitShip.pos.start.y + hitShip.pos.start.x - 1;
                    endIndex = len * hitShip.pos.end.y + hitShip.pos.end.x + 1
                } else { // Vertical ship
                    startIndex = len * (hitShip.pos.start.y - 1) + hitShip.pos.start.x;
                    endIndex = len * (hitShip.pos.end.y + 1) + hitShip.pos.end.x
                }
                globals.globalVariables['gridCells'][index].color = colors[1];
                globals.globalVariables['gridCells'][index].hasDot = true;
                globals.globalVariables['gridCells'][index2].color = colors[1];
                globals.globalVariables['gridCells'][index2].hasDot = true;
            }
            // Make ship sink if all parts are hit
            const grid = globals.getGlobalVariable('grid'); {
                grid.filter((ship) => ship.id === hitShip.id).forEach(shipPart => {
                    shipPart.sunk();
                });
            }
        } else {
            this.color = colors[5];
            this.hasDot = true;
        }
        this.addClasses([
            `bg-${this.color}`,
            `border-${this.borderColor}`,
            this.hasCross ? 'hasCross' : undefined,
            this.hasDot ? 'hasDot' : undefined]);
    }

    removeClasses(props) {
        props.forEach(prop => {
            this.element.classList.remove(prop);
        });
    }

    addClasses(props) {
        props.forEach(prop => {
            this.element.classList.add(prop);
        });
    }

}

class Gameboard {

    constructor() {
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
        globals.globalVariables['gridCells'] = [];
        const len = globals.getGlobalVariable('gridLength');
        for (let y = 0; y < len; y++) {
            for (let x = 0; x < len; x++) {
                const index = globals.getGlobalVariable('gridCells').length;
                const cell = new gridCell(`c${x}-${y}`, colors['white'], colors['black'], true, false, false, { x: x, y: y }, index);
                globals.globalVariables['gridCells'].push(cell);
                let element = globals.globalVariables['gridCells'][index].element;
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
            this.ships.push(assignShip(ship, distance));
        }
    }
}

// Utility functions ---

// Initiate appropriate classes
const globals = new GlobalData();
const gameboard = new Gameboard();

// Append appropriate elements
document.getElementById('gameboard').append(gameboard.container);

// Generate ship for testing
gameboard.shipFactory({ x: 2, y: 2 }, { x: 2, y: 4 });