const validateSchemaPost = schema => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error) {
      res.status(400).end();
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
      res.status(400).end();
    } else return next();
  };
};

module.exports = { validateSchemaPut, validateSchemaPost };
