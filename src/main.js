'use strict';

const R = require('ramda');
const path = require('path');
const fs = require('fs');

/*
 Task: Accept as parameter a list of CSV file names. The first line of each CSV file will be a header describing
 the contents of each 'column' of the file. The goal is to return an object for each file of the
 following form:

 {
 name: 'basename of CSV file',
 contents: [
 {
 header1: '...',
 header2: '...',
 // ...
 },
 {
 // ...
 }
 ]

 }
 */

// Some test data
const headers = ['header1', 'header2', 'header3'];
const data = [
    ['data11', 'data12', 'data13'],
    ['data21', 'data22', 'data23'],
    ['data31', 'data32', 'data33']
];

const testLines = [
    'header1, header2, header3',
    'data11, data12, data13',
    'data21, data22, data23',
    'data31, data32, data33'
];


const readFileSync = path => fs.readFileSync(path, {encoding: 'utf8'});

// Get the basename of the filename w/o the extension
const name = filename => path.basename(filename, '.csv');

// Given the contents of a file as a string, transform into an array of lines filtering out any empties
const getLines = R.pipe(
    R.split(/\r\n|\r|\n/),
    R.filter(R.pipe(R.prop('length'), len => len > 0))
);

// Given the lines of a file, return an array of word arrays
const getWords = R.map(R.split(/\s*,\s*/));


// Extract header and rest of lines
const extractHeader = R.map(R.converge((header, rest) => [R.flatten(header), rest])([R.take(1), R.drop(1)]));

const getObjects = R.map(arr => R.map(R.zipObj(arr[0]), arr[1]));


const r = R.pipe(
    R.map(
        R.pipe(
            readFileSync,
            R.split(/\r\n|\r|\n/),
            R.filter(R.pipe(
                R.prop('length'),
                len => len > 0)
            ),
            getWords
        )
    ),
    extractHeader,
    getObjects
)(['../data/csv1.csv', '../data/csv2.csv']);

console.log(r);







