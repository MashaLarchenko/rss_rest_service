const logger = require('./winstonLogger');

const requestLogger = (req, res, next) => {
  const { method, originalUrl } = req;
  const query = req.query ? JSON.stringify(req.query) : 'no query params';
  const body = req.method !== 'GET' ? JSON.stringify(req.body) : 'no body';
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
