// Middleware for handling errors

let NODE_ENV = 'development';
function setNodeEnv(env) {
  NODE_ENV = env;
}

const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
};

module.exports = {
  errorHandler,
  setNodeEnv
};
