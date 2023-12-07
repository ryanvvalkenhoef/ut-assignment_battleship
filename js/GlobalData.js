import getFilledGrid from './utils/getFilledGrid.js';
export default class GlobalData {
    constructor() {
        this.globalVariables = {
            'gridLength': 15,
            'gridCells': [],
            'colors': ['white', 'lightgrey', 'red', 'blue', 'lightpink', 'lightyellow']
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