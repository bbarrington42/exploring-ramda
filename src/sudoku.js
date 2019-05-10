'use strict';


const R = require('ramda');

const createRow = x => R.map(y => `${x}-${y}`)(R.range(0, 9));

const createTable = () => R.map(createRow)(R.range(0, 9));

const table = createTable();

console.table(table);

const getRow = table => row => table[row];

const getColumn = table => column => R.map(row => row[column])(table);

const diagLtoR = table => R.map(n => table[n][n])(R.range(0, 9));

const diagRtoL = table => R.map(n => table[n][n])(R.reverse(R.range(0, 9)));

const getSquare =
    table =>
        rowStart =>
            colStart =>
                R.map(row => R.map(col => table[rowStart + row][colStart + col])(R.range(0, 3)))(R.range(0, 3));

console.log(getSquare(table)(0)(3));
