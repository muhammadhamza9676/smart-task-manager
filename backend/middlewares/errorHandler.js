const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: error.message || 'Server error',
      status: statusCode,
    },
  });
};

module.exports = errorHandler;