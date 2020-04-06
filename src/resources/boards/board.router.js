const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const boardSchemas = require('./board.schema');
const validator = require('../validator/validator');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getBoardById(id);
  if (board !== undefined) {
    res.json(board);
  } else {
    res.status(404).end();
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
      res.json(board);
    }
  );

router
  .route('/:id')
  .put(
    validator.validateSchemaPut(boardSchemas.schemaForPut),
    async (req, res) => {
      const { id } = req.params;
      const board = await boardsService.updateBoard(id, req.body);
      res.json(board);
    }
  );

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.deleteBoard(id);
  if (board !== undefined) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
