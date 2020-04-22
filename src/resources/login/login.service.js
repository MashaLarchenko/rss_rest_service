const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const userService = require('../users/user.service');

const loginUser = async (login, password) => {
  const user = await userService.getUserByProps(login, password);
  const payload = { userId: user.id, login };
  const token = await jwt.sign(payload, JWT_SECRET_KEY);
  return token;
};

module.exports = { loginUser };
