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


const logger = (msg, s) => {
    if (s === undefined) {
        s = msg;
        msg = '-->: ';
    }
    const js = JSON.stringify(s);
    console.log(`${msg}${js}`);
    return s;
};

const input = ['../data/csv1.csv', '../data/csv2.csv'];


const readFileSync = path => fs.readFileSync(path, {encoding: 'utf8'});

// Get the basename of the filename w/o the extension
const name = filename => path.basename(filename, '.csv');

// Given the contents of a file as a string, transform into an array of lines filtering out any empties
const getLines = R.pipe(R.split(/\r\n|\r|\n/), R.reject(R.isEmpty));

// Given the lines of a file, return an array of word arrays
const getWords = R.map(R.split(/\s*,\s*/));

// Combine the preceding to transform a file name to an array of the contents
const fromFile = R.map(R.pipe(readFileSync, getLines, getWords));


// Extract header and rest of lines. The header must flattened as it's entries are the attribute names for each row
const extractHeader = R.converge((header, rest) => [R.flatten(header), rest])([R.take(1), R.drop(1)]);

// Create objects by zipping the header with the rows
const zipRows = arr => R.map(R.zipObj(arr[0]), arr[1]);

const makeObjects = R.map(R.pipe(extractHeader, zipRows));

const addNameWithContents = (filename, contents) => {
    return {
        name: name(filename),
        contents
    };
};


const r = R.pipe(fromFile, makeObjects, R.zipWith(addNameWithContents, input))(input);


console.log(JSON.stringify(r));







