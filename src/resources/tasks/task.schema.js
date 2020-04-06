const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  boardId: Joi.string().required(),
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string(),
  userId: Joi.string(),
  columnId: Joi.string().required()
});

const schemaForPut = Joi.object().keys({
  id: Joi.string().required(),
  order: Joi.number(),
  description: Joi.string(),
  userId: Joi.string(),
  boardId: Joi.string().required(),
  columnId: Joi.string()
});

module.exports = { schemaForPost, schemaForPut };
