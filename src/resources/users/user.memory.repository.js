const User = require('./user.model.js');

const UsersData = [
  new User({ id: '1', name: 'Masha', login: 'masha', passwold: '122345n' }),
  new User({ id: '2', name: 'Sasha', login: 'sasha', passwold: '1334s' }),
  new User({ id: '3', name: 'Pasha', login: 'pasha', passwold: '1777p' }),
  new User()
];

const findById = async id => {
  return UsersData.find(user => {
    return user.id === id;
  });
};

const getAll = async () => {
  return UsersData;
};

const getUserById = async id => {
  const user = await findById(id);
  if (user) {
    const { name, login } = user;
    return { id, name, login };
  }
  return user;
};

const createUser = async newUser => {
  UsersData.push(newUser);
  return newUser;
};

const updateUser = async (id, dataForUpdate) => {
  const findUser = await findById(id);
  if (findUser) {
    const updatedUser = {
      ...findUser,
      ...dataForUpdate
    };
    const index = UsersData.indexOf(findUser);
    UsersData[index] = updatedUser;
    return updatedUser;
  }
  return findUser;
};

const deleteUser = async id => {
  const deletedUser = await findById(id);
  if (deletedUser) {
    const index = UsersData.indexOf(deletedUser);
    UsersData.splice(index, 1);
  }

  return deletedUser;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
