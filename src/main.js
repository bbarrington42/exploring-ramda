import {createTable} from './sudoku';
import {renderTable, addKeyEvent} from './presenter';


let table = createTable();

renderTable(table);


addKeyEvent(table);
