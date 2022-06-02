const errorMiddleware = (err, _req, res, _next) => res
  .status(500)
  .json({ message: `Something went wrong: ${err.message}` });

module.exports = errorMiddleware;
