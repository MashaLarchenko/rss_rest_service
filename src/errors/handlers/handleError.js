const { logger } = require('../../common/logger');
const NotFoundError = require('../NotFoundError');
const InvalidRequestError = require('../InvalidRequestError');
const { NOT_FOUND, BAD_REQUEST, getStatusText } = require('http-status-codes');

const logInfo = (status, path, message) => {
  return {
    'error code': getStatusText(status),
    url: `Ocured an error in path ${path}`,
    message
  };
};

const responsData = (status, path, message) => {
  return {
    code: status,
    url: `Ocured an error in path ${path}`,
    message
  };
};
const handleError = (err, req, res, next) => {
  const { originalUrl } = req;
  const { message } = err;
  if (err instanceof NotFoundError) {
    logger.error(logInfo(NOT_FOUND, originalUrl, message));
    res.status(NOT_FOUND).json(responsData(NOT_FOUND, originalUrl, message));
  } else if (err instanceof InvalidRequestError) {
    logger.error(logInfo(BAD_REQUEST, originalUrl, message));
    res
      .status(BAD_REQUEST)
      .json(responsData(BAD_REQUEST, originalUrl, message));
  } else return next(err);
};

module.exports = handleError;
