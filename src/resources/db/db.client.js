const mongoose = require('mongoose');
const usersData = require('./user.inMemoryData');
const tasksData = require('./tasks.inMemoryData');
const boardsData = require('./boards.inMemoryData');
const { MONGO_CONNECTION_STRING } = require('../../common/config');

const connectToDb = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log(" we're connected!");
    await db.dropDatabase();
    usersData.forEach(user => user.save());
    tasksData.forEach(task => task.save());
    boardsData.forEach(board => board.save());

    cb();
  });
};

module.exports = connectToDb;
