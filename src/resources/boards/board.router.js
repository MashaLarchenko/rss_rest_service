const router = require('express').Router();
const { OK, NOT_FOUND } = require('http-status-codes');
const Board = require('./board.model');
const boardsService = require('./board.service');
const boardSchemas = require('./board.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(OK).json(boards);
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getBoardById(id);
    if (board !== undefined) {
      res.status(OK).json(board);
    } else {
      res.status(NOT_FOUND).json(`Board with id ${id} not found`);
    }
  })
);

router.route('/').post(
  validator.validateSchemaPost(boardSchemas.schemaForPost),
  catchErrors(async (req, res) => {
    const requestData = req.body;
    const board = await boardsService.createBoard(
      Board.fromRequest(requestData)
    );
    res.status(OK).json(board);
  })
);

router.route('/:id').put(
  validator.validateSchemaPut(boardSchemas.schemaForPut),
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const requestData = req.body;
    const board = await boardsService.updateBoard(id, requestData);
    res.status(OK).json(board);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.deleteBoard(id);
    if (board !== undefined) {
      res.status(204).json(`Board with id ${id} has been succesfully deleted`);
    } else {
      res.status(NOT_FOUND).json(`Board with id ${id} not found`);
    }
  })
);

module.exports = router;
