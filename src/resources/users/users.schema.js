const Joi = require('@hapi/joi');

const schemaForPost = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
  login: Joi.string().required()
});

const schemaForPut = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string(),
  password: Joi.string(),
  login: Joi.string()
});

module.exports = { schemaForPost, schemaForPut };
