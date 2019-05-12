import {createTable} from './sudoku';
import {renderTable} from './presenter';

import _ from 'lodash';
import * as R from 'ramda';


const randomPair = (lower, upper) => [_.random(lower, upper), _.random(lower, upper)];


const randomPairs = (lower, upper) => count => R.map(() => randomPair(lower, upper), R.range(0, count - 1));

const setTable = table =>
    R.forEach(pair => table[pair[0]][pair[1]] = _.random(1, 9), randomPairs(0, 8)(10));


let t = createTable();

setTable(t);

renderTable(t);
