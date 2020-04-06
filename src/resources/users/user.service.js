const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const createUser = user => usersRepo.createUser(user);

const updateUser = (id, param) => usersRepo.updateUser(id, param);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
