const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  title: Joi.string().required(),
  columns: Joi.array().required()
});

const schemaForPut = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string(),
  columns: Joi.array()
});

module.exports = { schemaForPost, schemaForPut };
