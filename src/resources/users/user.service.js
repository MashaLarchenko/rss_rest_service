const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');
const createHash = require('../../common/hashPassword');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const getUserByProps = async (login, password) => {
  if (password !== 'admin') {
    password = await createHash(password);
  }
  return usersRepo.getUserByProps(login, password);
};

const createUser = async user => {
  let { password } = user;
  password = await createHash(password);
  const updatedUser = { ...user, password };
  return usersRepo.createUser(updatedUser);
};

const updateUser = (id, param) => usersRepo.updateUser(id, param);

const deleteUser = async id => {
  await tasksService.unassignTask(id);
  return usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByProps
};
