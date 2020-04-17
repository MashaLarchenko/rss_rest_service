const Board = require('../boards/board.model');
const Column = require('../boards/column.model');

const boardsData = [
  new Board({
    id: '1',
    title: 'Board1',
    columns: [
      new Column({ title: 'column1B1', order: '0' }),
      new Column({ title: 'column2B1', order: '1' }),
      new Column()
    ]
  }),
  new Board({
    id: '2',
    title: 'Board2',
    columns: [
      new Column({ title: 'column1B2', order: '0' }),
      new Column({ title: 'column2B2', order: '1' }),
      new Column()
    ]
  }),
  new Board({
    id: '3',
    title: 'Board3',
    columns: [
      new Column({ title: 'column1B3', order: '0' }),
      new Column({ title: 'column2B3', order: '1' }),
      new Column()
    ]
  }),
  new Board()
];

module.exports = boardsData;
