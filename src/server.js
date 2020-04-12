const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./common/logger');

process
  .on('uncaughtException', err => {
    logger.error(`Uncaught Exception:${err.message} ${err.stack}`);
    const exit = process.exit;
    exit(1);
  })
  .on('unhandledRejection', err => {
    logger.error(`Unhandled Promise Rejection: ${err.message} ${err.stack}`);
    const exit = process.exit;
    exit(1);
  });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
