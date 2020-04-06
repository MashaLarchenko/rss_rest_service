const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Task',
    order = '0',
    description = 'task',
    userId = 'null',
    columnId = '1',
    boardId = '1'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static fromRequest(boardId, json) {
    const user = new Task({
      ...json,
      boardId
    });
    return user;
  }
}

module.exports = Task;
