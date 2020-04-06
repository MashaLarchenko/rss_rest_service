const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = 'columns' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static fromRequest(requestData) {
    const { title, columns } = requestData;
    const user = new Board({ title, columns });
    return user;
  }
}

module.exports = Board;
