const User = require('../users/user.model');

const usersData = [
  new User({ name: 'Masha', login: 'masha', passwold: '122345n' }),
  new User({ name: 'Sasha', login: 'sasha', passwold: '1334s' })
];

module.exports = usersData;
