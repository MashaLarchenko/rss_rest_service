const catchError = fn => async (req, res, next) => {
  try {
    return await fn(req, res);
  } catch (error) {
    return next(error);
  }
};

module.exports = catchError;
