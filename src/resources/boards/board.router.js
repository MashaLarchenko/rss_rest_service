const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const boardSchemas = require('./board.schema');
const validator = require('../validator/validator');
const statusCode = require('../statusCodes/resonsesStatusData');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(statusCode.SUCCESS).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getBoardById(id);
  if (board !== undefined) {
    res.status(statusCode.SUCCESS).json(board);
  } else {
    res.status(statusCode.NOT_FOUND).json(`Board with id ${id} not found`);
  }
});

router
  .route('/')
  .post(
    validator.validateSchemaPost(boardSchemas.schemaForPost),
    async (req, res) => {
      const board = await boardsService.createBoard(
        Board.fromRequest(req.body)
      );
      res.status(statusCode.SUCCESS).json(board);
    }
  );

router
  .route('/:id')
  .put(
    validator.validateSchemaPut(boardSchemas.schemaForPut),
    async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.updateBoard(id, req.body);
      res.status(statusCode.SUCCESS).json(board);
    }
  );

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.deleteBoard(id);
  if (board !== undefined) {
    res.status(204).json(`Board with id ${id} has been succesfully deleted`);
  } else {
    res.status(statusCode.NOT_FOUND).json(`Board with id ${id} not found`);
  }
});

module.exports = router;
