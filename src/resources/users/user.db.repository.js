const User = require('./user.model.js');
const NotFoundError = require('../../errors/NotFoundError');

const findById = async id => {
  return User.findOne({ _id: id });
};

const getAll = async () => {
  return User.find({});
};

const getUserById = async id => {
  const user = await findById(id);
  if (user === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return user;
};

const createUser = async newUser => {
  return User.create(newUser);
};

const updateUser = async (id, dataForUpdate) => {
  const updatedUser = await User.findByIdAndUpdate(id, dataForUpdate, {
    new: true
  });
  if (updatedUser === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return updatedUser;
};

const deleteUser = async id => {
  const deletedUser = await findById(id);
  if (deletedUser === null) {
    throw new NotFoundError(`User with id ${id} not found`);
  } else {
    return (await User.deleteOne({ _id: id }).exec()).deletedCount;
  }
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };