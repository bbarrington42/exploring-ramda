'use strict';


const R = require('ramda');

const createRow = () => R.repeat(null, 9);
const createTable = () => R.times(createRow, 9);

// These 2 for testing
const createRow2 = x => R.map(y => `${x}-${y}`)(R.range(0, 9));
const createTable2 = () => R.map(createRow2)(R.range(0, 9));


const getRow = table => row => table[row];

const getColumn = table => column => R.map(row => row[column])(table);

const getMainDiag = table => R.addIndex(R.map)((row, index) => row[index])(table);

const getBackDiag = table => R.addIndex(R.map)((row, index) => row[8 - index])(table);

const getArea =
    table =>
        x =>
            y => R.chain(R.slice(x * 3, x * 3 + 3))(R.map(row => table[row])(R.range(y * 3, y * 3 + 3)));
