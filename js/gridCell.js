class gridCell {

    constructor(id, color, borderColor, isEnabled, hasDot, hasCross, position, index, globals) {
        this.id = id;
        this.color = color ?? 'white';
        this.hasDot = hasDot ?? false;
        this.hasCross = hasCross ?? false;
        this.isEnabled = isEnabled ?? true;
        this.borderColor = borderColor ?? 'black';
        this.pos = position;
        this.index = index;

        this.globals = globals;

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
        let colors = this.globals.globalVariables['colors'];
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
            const hitShip = this.globals.getGlobalVariable('grid')[this.pos.y][this.pos.x];
            const len = this.globals.getGlobalVariable('gridLength');
            let startIndex, endIndex;
            if (hasSunk(hitShip.length, hitShip.hits)) {
                if (hitShip.pos.start.x == hitShip.pos.end.x) { // Horizontal ship
                    startIndex = len * hitShip.pos.start.y + hitShip.pos.start.x - 1;
                    endIndex = len * hitShip.pos.end.y + hitShip.pos.end.x + 1
                } else { // Vertical ship
                    startIndex = len * (hitShip.pos.start.y - 1) + hitShip.pos.start.x;
                    endIndex = len * (hitShip.pos.end.y + 1) + hitShip.pos.end.x
                }
                this.globals.globalVariables['gridCells'][index].color = colors[1];
                this.globals.globalVariables['gridCells'][index].hasDot = true;
                this.globals.globalVariables['gridCells'][index2].color = colors[1];
                this.globals.globalVariables['gridCells'][index2].hasDot = true;
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