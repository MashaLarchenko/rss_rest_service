const catchError = fn => async (req, res, next) => {
  try {
    return await fn(req, res);
  } catch (error) {
    console.log('Error:', error);
    return next(error);
  }
};

module.exports = catchError;
