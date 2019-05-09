'use strict';

 const _ = require('lodash');
//
// const args = [1,2,3];
//
const func1 = x => console.log(`func1: ${x}`);
// const func1p = x => func1(x);
//
const func2 = (x, y) => console.log(`func2: ${x}, ${y}`);
//
// const func3 = x => y => z => console.log(`func3: ${x}, ${y}, ${z}`);
//
//
// func1(args);
// func2(1)(args);
// //func3(args);
//
// //func1p(args);
//
// const sfunc3 = (x, y, z) => console.log(`sfunc3: ${x}, ${y}, ${z}`);
//
//
// sfunc3(args);

//
// _.map([1,2,3,4], (...args) => console.log(`x: ${args}`));
// _.map([1,2,3,4], func1);
// _.map([1,2,3,4], func2);



const flipPad = _.flip(_.pad);


const curriedFlipPad = _.curry(flipPad, 3);
const padWord10 = (...x) => {
    console.log(`x: ${x}`);
    curriedFlipPad(' ', 10)(x);
};

_.map(['blart', 'woof'], padWord10);
