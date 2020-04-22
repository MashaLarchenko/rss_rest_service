const User = require('../resources/users/user.model');

const usersData = [
  new User({ name: 'admin', login: 'admin', password: 'admin' }),
  new User({ name: 'Sasha', login: 'sasha', password: '1334s' })
];

module.exports = usersData;
