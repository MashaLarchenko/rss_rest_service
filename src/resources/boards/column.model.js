const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'COLUMN', order = '0' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(board) {
    const { id, title, order } = board;
    return { id, title, order };
  }

  static fromRequest(requestData) {
    const { title, order } = requestData;
    const user = new Column({ title, order });
    return user;
  }
}

module.exports = Column;
