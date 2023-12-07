import './utils/index.js';
const { globals } = require('./GlobalData.js');
const { Ship } = require('./Ship.js');
const { Gameboard } = require('./Gameboard.js');
const { gridCell } = require('./gridCell.js');

// Utility functions ---

// Initiate appropriate classes
const gameboard = new Gameboard(globals);

// Append appropriate elements
document.getElementById('gameboard').append(gameboard.container);

// Generate ship for testing
gameboard.shipFactory({ x: 2, y: 2 }, { x: 2, y: 4 });