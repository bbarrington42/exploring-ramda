'use strict';

const R = require('ramda');


const r = R.ap([R.multiply(2), R.add(3)], [1,2,3]);

console.log(r);
