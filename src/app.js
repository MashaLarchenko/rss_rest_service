const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const writeStream = fs.createWriteStream(
  path.join(__dirname, './log/reqestLog'),
  { flags: 'a' }
);

// const logRequest = morgan('combined', {
//   stream: writeStream
// });

morgan.token('query', req => {
  return req.query ? JSON.stringify(req.body) : 'no query params';
});

morgan.token('body', req => {
  return req.method !== 'GET' ? JSON.stringify(req.body) : 'no body';
});

app.use(morgan('dev'));

app.use(
  morgan(':method :url :response-time :query :body', {
    stream: writeStream
  })
);

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('INTERNAL ERROR');
  return next(err);
});

module.exports = app;
