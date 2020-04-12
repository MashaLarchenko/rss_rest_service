const InvalidRequestError = require('../errors/InvalidRequestError');

const validateSchemaPost = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      throw new InvalidRequestError(
        `Error in POST request in ${req.originalUrl}`
      );
    } else return next();
  };
};

const validateSchemaPut = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error !== undefined) {
      console.log('validate PUT');
      throw new InvalidRequestError(
        `Error in PUT request in ${req.originalUrl}`
      );
    } else return next();
  };
};

module.exports = { validateSchemaPut, validateSchemaPost };
