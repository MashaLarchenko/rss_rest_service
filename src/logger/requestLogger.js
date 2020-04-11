const logger = require('./loggerConfig');

const requestLogger = (req, res, next) => {
  const { method, originalUrl } = req;
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);
  const time = new Date();

  logger.info('Request log', {
    Time: time,
    Method: method,
    Path: originalUrl,
    'Query params': query,
    Body: body
  });
  next();
};

module.exports = requestLogger;
