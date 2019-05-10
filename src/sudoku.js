'use strict';


const R = require('ramda');

const createRow = () => R.repeat(null, 9);
const createTable = () => R.times(createRow, 9);

// These 2 for testing
const createRow2 = x => R.map(y => `${x}-${y}`)(R.range(0, 9));
const createTable2 = () => R.map(createRow2)(R.range(0, 9));

const table = createTable2();
console.table(table);


const getRow = table => row => table[row];

const getColumn = table => column => R.map(row => row[column])(table);

const getMainDiag = table => R.addIndex(R.map)((row, index) => row[index])(table);

const getBackDiag = table => R.addIndex(R.map)((row, index) => row[8 - index])(table);

const getArea =
    table => (x, y) =>
        R.chain(R.slice(x * 3, x * 3 + 3))(R.map(row => table[row])(R.range(y * 3, y * 3 + 3)));


const getAllAreas = table =>
    R.chain(x => R.map(y => getArea(table)(x, y), R.range(0, 3)))(R.range(0, 3));

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

    return loop(R.reject(R.isNil)(values));
};


// Individual constraint checks.
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


const validate = table => (row, col) => {
    const constraints = getAllConstraints(table);
    const validators = [
        R.propSatisfies(rowDistinct(row), 'rows'),
        R.propSatisfies(colDistinct(col), 'cols'),
        R.propSatisfies(areaDistinct(row, col), 'areas'),
        R.propSatisfies(diagDistinct(row, col), 'diags')
    ];

    return R.all(R.identity, R.map(f => f(constraints))(validators));
};

console.log(validate(table)(0, 0));
