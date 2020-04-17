const User = require('../users/user.model');

const usersData = [
  new User({ name: 'Masha', login: 'masha', passwold: '122345n' }),
  new User({ name: 'Sasha', login: 'sasha', passwold: '1334s' }),
  new User({ name: 'Pasha', login: 'pasha', passwold: '1777p' })
];

module.exports = usersData;
