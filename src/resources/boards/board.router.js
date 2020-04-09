const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const boardSchemas = require('./board.schema');
const validator = require('../../validator/validator');
const statusCode = require('../../statusCodes/resonsesStatusData');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    // throw new Error('fhrhrt');
    const boards = await boardsService.getAll();
    res.status(statusCode.SUCCESS).json(boards);
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getBoardById(id);
    if (board !== undefined) {
      res.status(statusCode.SUCCESS).json(board);
    } else {
      res.status(statusCode.NOT_FOUND).json(`Board with id ${id} not found`);
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
    res.status(statusCode.SUCCESS).json(board);
  })
);

router.route('/:id').put(
  validator.validateSchemaPut(boardSchemas.schemaForPut),
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const requestData = req.body;
    const board = await boardsService.updateBoard(id, requestData);
    res.status(statusCode.SUCCESS).json(board);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.deleteBoard(id);
    if (board !== undefined) {
      res.status(204).json(`Board with id ${id} has been succesfully deleted`);
    } else {
      res.status(statusCode.NOT_FOUND).json(`Board with id ${id} not found`);
    }
  })
);

module.exports = router;
