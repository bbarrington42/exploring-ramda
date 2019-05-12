import * as R from 'ramda';
import _ from 'lodash';

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

const addKeyEvent = table => null;

export const renderTable = table => {
    document.getElementsByClassName('js-table')[0].innerHTML =
        tableTemplate({table});

    addAllClickEvents(table);
    addKeyEvent(table);
};
