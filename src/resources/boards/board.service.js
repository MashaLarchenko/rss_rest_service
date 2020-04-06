const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoardById = id => boardsRepo.getBoardById(id);

const createBoard = board => boardsRepo.createBoard(board);

const updateBoard = (id, param) => boardsRepo.updateBoard(id, param);

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
