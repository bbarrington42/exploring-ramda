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

const readFileSync = path => fs.readFileSync(path, {encoding: 'utf8'});

// Get the basename of the filename w/o the extension
const name = filename => path.basename(filename, '.csv');

// Given a header array and an array of data arrays, return an array of objects.
const content = headers => R.map(R.zipObj(headers));

// Given the contents of a file as a 



console.log(content(headers)(data));







