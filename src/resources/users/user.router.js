const router = require('express').Router();
const { OK, NOT_FOUND } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const usersSchemas = require('./users.schema');
const validator = require('../../validator/validator');
const catchErrors = require('../../errors/catchError');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    if (user !== undefined) {
      res.status(OK).json(User.toResponse(user));
    } else {
      res.status(NOT_FOUND).json(`User with id ${id} not found`);
    }
  })
);

router.route('/').post(
  validator.validateSchemaPost(usersSchemas.schemaForPost),
  catchErrors(async (req, res) => {
    const requestData = req.body;
    const user = await usersService.createUser(User.fromRequest(requestData));
    res.status(OK).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  validator.validateSchemaPut(usersSchemas.schemaForPut),
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const requestData = req.body;
    const user = await usersService.updateUser(id, requestData);
    if (user !== undefined) {
      res.status(OK).json(user);
    } else {
      res.status(NOT_FOUND).json(`User with id ${id} not found`);
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.deleteUser(id);
    if (user !== undefined) {
      res.status(204).json(`User with id ${id} has been succesfully deleted`);
    } else {
      res.status(NOT_FOUND).json(`User with id ${id} not found`);
    }
  })
);

module.exports = router;
