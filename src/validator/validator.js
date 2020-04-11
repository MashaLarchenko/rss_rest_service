const { BAD_REQUEST, getStatusText } = require('http-status-codes');
const { logger } = require('../logger');

const validateSchemaPost = schema => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      const { message } = error;
      logger.error({
        'error code': getStatusText(BAD_REQUEST),
        url: `Error in POST request in ${req.originalUrl}`,
        message
      });
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
      logger.error({
        'error code': getStatusText(BAD_REQUEST),
        url: `Error in PUT request in ${req.originalUrl}`,
        message
      });
      res.status(BAD_REQUEST).json(message);
    } else return next();
  };
};

module.exports = { validateSchemaPut, validateSchemaPost };
