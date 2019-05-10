'use strict';


const R = require('ramda');

const createRow = () => R.repeat(null, 9);
const createTable = () => R.times(createRow, 9);

// These 2 for testing
const createRow2 = x => R.map(y => `${x}-${y}`)(R.range(0, 9));
const createTable2 = () => R.map(createRow2)(R.range(0, 9));

const table = createTable2();


const getRow = table => row => table[row];

const getColumn = table => column => R.map(row => row[column])(table);

const getMainDiag = table => R.addIndex(R.map)((row, index) => row[index])(table);

const getBackDiag = table => R.addIndex(R.map)((row, index) => row[8 - index])(table);

const getArea =
    table => (x, y) =>
        R.chain(R.slice(x * 3, x * 3 + 3))(R.map(row => table[row])(R.range(y * 3, y * 3 + 3)));


const getAllAreas = table =>
    R.chain(x => R.map(y => getArea(table)(x, y), R.range(0, 3)))(R.range(0, 3));

/*
 Notable differences between my implementation and Zsolt's.
 Mine is probably overkill in that it validates a specific cell. Zsolt's implementation is much simpler in that
 it checks the entire table regardless of the which cell changed?
 But I learned a lot by implementing it this way. ;-) In particular, the use of R.propSatisfies... in the validation
 function.
 */

const getAllConstraints = table => {
    const rows = table;
    const cols = R.map(getColumn(table), R.range(0, 9));
    const areas = getAllAreas(table);
    const diags = [getMainDiag(table), getBackDiag(table)];

    return {rows, cols, areas, diags};
};

const allDistinct = values => {

    const loop = rest => {
        const [head, ...tail] = rest;
        return R.isNil(head) ? true : R.includes(head)(tail) ? false : loop(tail);
    };

    // Filter out all nulls first
    return loop(R.reject(R.isNil)(values));
};


// Individual constraint checks.
// It's important that the array is passed last to all of these so that it can be used as argument to R.propSatisfies(...
const rowDistinct = row => rows => allDistinct(rows[row]);

const colDistinct = col => cols => allDistinct(cols[col]);

const areaDistinct = (row, col) => areas => {
    const index = Math.floor(col / 3) * 3 + Math.floor(row / 3);
    return allDistinct(areas[index]);
};

const diagDistinct = (row, col) => diags => {
    if (row === col) return allDistinct(diags[0]);
    if (row + col === 8) return allDistinct(diags[1]);
    return true;
};

//table[3][4] = '3-3';
console.table(table);

const validate = table => (row, col) => {
    const constraints = getAllConstraints(table);

    // Create an array of validation functions.
    const validators = [
        R.propSatisfies(rowDistinct(row), 'rows'),
        R.propSatisfies(colDistinct(col), 'cols'),
        R.propSatisfies(areaDistinct(row, col), 'areas'),
        R.propSatisfies(diagDistinct(row, col), 'diags')
    ];

    // Apply each validator to the constraints and return false if any fail.
    return R.all(R.identity, R.map(f => f(constraints))(validators));
};


//const r = R.chain(x => R.map(y => validate(table)(x, y))(R.range(0, 9)))(R.range(0, 9));
//console.log(r);


