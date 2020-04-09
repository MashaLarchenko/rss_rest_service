const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const taskSchemas = require('./task.schema');
const validator = require('../../validator/validator');
const statusCode = require('../../statusCodes/resonsesStatusData');
const catchErrors = require('../../errors/catchError');

router.route('/:boardId/tasks').get(
  catchErrors(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.status(statusCode.SUCCESS).json(tasks);
  })
);

router.route('/:boardId/tasks/:id').get(
  catchErrors(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getTaskById(id, boardId);
    if (task !== undefined) {
      res.status(statusCode.SUCCESS).json(task);
    } else {
      res.status(statusCode.NOT_FOUND).json(`Task with id ${id} not found`);
    }
  })
);

router.route('/:boardId/tasks').post(
  catchErrors(async (req, res) => {
    const { boardId } = req.params;
    const requestData = req.body;
    const task = await tasksService.createTask(
      Task.fromRequest(boardId, requestData)
    );
    res.status(statusCode.SUCCESS).json(task);
  })
);

router.route('/:boardId/tasks/:id').put(
  validator.validateSchemaPut(taskSchemas.schemaForPut),
  catchErrors(async (req, res) => {
    const { id, boardId } = req.params;
    const requestData = req.body;
    const task = await tasksService.updateTask(id, boardId, requestData);
    if (task !== undefined) {
      res.status(statusCode.SUCCESS).json(task);
    } else {
      res.status(statusCode.NOT_FOUND).json(`Task with id ${id} not found`);
    }
  })
);

router.route('/:boardId/tasks/:id').delete(
  catchErrors(async (req, res) => {
    const { id, boardId } = req.params;
    const task = await tasksService.deleteTask(id, boardId);
    if (task !== undefined) {
      res.status(204).json(`Task with id ${id} has been succesfully deleted`);
    } else {
      res.status(statusCode.NOT_FOUND).json(`Task with id ${id} not found`);
    }
  })
);

module.exports = router;
