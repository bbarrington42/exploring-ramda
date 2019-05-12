import * as R from 'ramda';
import _ from 'lodash';

import {setCell} from './sudoku';

const templateString =
    document.getElementsByClassName('js-table-template')[0].innerHTML;

const tableTemplate = _.template(templateString);

const selectCell = domNode => {
    R.forEach(node => {
        node.classList.remove('selected');
        node.classList.remove('js-selected');
    }, document.getElementsByClassName('js-selected'));

    domNode.classList.add('selected');
    domNode.classList.add('js-selected');
};

const addClickEvent = item =>
    item.addEventListener('click', event => {
        console.log('target', event.target);
        console.log('dataset', event.target.dataset);
        selectCell(item);
    });

const addAllClickEvents = table =>
    R.forEach(addClickEvent, document.getElementsByClassName('js-sudoku-cell'));

const insertValue = (key, table) => {
    const selectedNode = document.getElementsByClassName('js-selected')[0];
    if (selectedNode) {
        const dataset = selectedNode.dataset;
        const value = parseInt(key) || null;
        renderTable(setCell(table, dataset.row, dataset.column, value));
    }
};

export const addKeyEvent = table =>
    window.addEventListener('keypress', event => {
        console.log('event', event);
        const key = event.key;
        if ('123456789 '.indexOf(key) >= 0) {
            insertValue(key, table);
        }
    });

export const renderTable = table => {
    document.getElementsByClassName('js-table')[0].innerHTML =
        tableTemplate({table});

    addAllClickEvents(table);
};
