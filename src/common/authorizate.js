const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET_KEY } = require('./config');

const checkToken = req => {
  const token = req.header('Authorization');
  try {
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }
    const userData = jwt.verify(token.slice(7), JWT_SECRET_KEY);
    return userData;
  } catch (error) {
    throw new UnauthorizedError('Failed to authenticate token');
  }
};

const authorizate = (req, res, next) => {
  const route = req.originalUrl;
  if (route === '/' || route === '/doc' || route === '/login') return next();
  checkToken(req);
  next();
};

module.exports = authorizate;
