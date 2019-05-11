'use strict';

const R = require('ramda');


const doubler = x => x * 2;

const doit = f => f(2, 3);

const r = doit(doubler);

console.log(r);
