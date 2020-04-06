const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const usersSchemas = require('./schema');
const validator = require('../validator/validator');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);
  if (user !== undefined) {
    res.json(User.toResponse(user));
  } else {
    res.status(404).end();
  }
});

router
  .route('/')
  .post(
    validator.validateSchemaPost(usersSchemas.schemaForPost),
    async (req, res) => {
      const user = await usersService.createUser(User.fromRequest(req.body));
      res.json(User.toResponse(user));
    }
  );

router
  .route('/:id')
  .put(
    validator.validateSchemaPut(usersSchemas.schemaForPut),
    async (req, res) => {
      const { id } = req.params;
      const user = await usersService.updateUser(id, req.body);
      res.json(user);
    }
  );

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.deleteUser(id);
  if (user !== undefined) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
