const Task = require('../tasks/task.model');

const tasksData = [
  new Task({
    id: '1',
    title: 'Task1',
    order: 0,
    description: 'task1',
    userId: '1',
    boardId: '1',
    columnId: '1'
  }),
  new Task({
    id: '2',
    title: 'Task2',
    order: 1,
    description: 'task2',
    userId: '2',
    boardId: '2',
    columnId: '2'
  }),
  new Task({
    id: '3',
    title: 'Task3',
    order: 2,
    description: 'task3',
    userId: '3',
    boardId: '3',
    columnId: '3'
  }),
  new Task()
];

module.exports = tasksData;
