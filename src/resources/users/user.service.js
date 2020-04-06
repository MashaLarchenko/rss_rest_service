const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const createUser = user => usersRepo.createUser(user);

const updateUser = (id, param) => usersRepo.updateUser(id, param);

const deleteUser = async id => {
  await tasksService.unassignTask(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
