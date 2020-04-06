const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'BOARD', order = 'columns' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(board) {
    const { id, title, order } = board;
    return { id, title, order };
  }

  static fromRequest(json) {
    const { title, order } = json;
    const user = new Column({ title, order });
    return user;
  }
}

module.exports = Column;
