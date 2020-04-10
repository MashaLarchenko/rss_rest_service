const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./logger/winstonLogger');

process
  .on('uncaughtException', err => {
    logger.error(`Uncaught Exception:${err.message} ${err.stack}`);
  })
  .on('unhandledRejection', err => {
    logger.error(`Unhandled Promise Rejection: ${err.message} ${err.stack}`);
  });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
