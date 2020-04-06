const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const taskSchemas = require('./task.schema');
const validator = require('../validator/validator');
const statusCode = require('../statusCodes/resonsesStatusData');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.json(tasks);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { boardId, id } = req.params;
  const task = await tasksService.getTaskById(id, boardId);
  if (task !== undefined) {
    res.status(statusCode.SUCCESS).json(task);
  } else {
    res.status(statusCode.NOT_FOUND).json(`Task with id ${id} not found`);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.createTask(
    Task.fromRequest(boardId, req.body)
  );
  res.status(statusCode.SUCCESS).json(task);
});

router
  .route('/:boardId/tasks/:id')
  .put(
    validator.validateSchemaPut(taskSchemas.schemaForPut),
    async (req, res) => {
      const { id, boardId } = req.params;
      const task = await tasksService.updateTask(id, boardId, req.body);
      if (task !== undefined) {
        res.status(statusCode.SUCCESS).json(task);
      } else {
        res.status(statusCode.NOT_FOUND).json(`Task with id ${id} not found`);
      }
    }
  );

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { id, boardId } = req.params;
  const task = await tasksService.deleteTask(id, boardId);
  if (task !== undefined) {
    res.status(204).json(`Task with id ${id} has been succesfully deleted`);
  } else {
    res.status(statusCode.NOT_FOUND).json(`Task with id ${id} not found`);
  }
});

module.exports = router;
