import {createTable} from './sudoku';
import {renderTable, addKeyEvent} from './presenter';


let t = createTable();

renderTable(t);


addKeyEvent(t);
