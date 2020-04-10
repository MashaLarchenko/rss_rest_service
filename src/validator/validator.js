const { BAD_REQUEST } = require('http-status-codes');

const validateSchemaPost = schema => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      const { message } = error;
      res.status(BAD_REQUEST).json(message);
    } else return next();
  };
};

const validateSchemaPut = schema => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.params, req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      const { message } = error;
      res.status(BAD_REQUEST).json(message);
    } else return next();
  };
};

module.exports = { validateSchemaPut, validateSchemaPost };
