const { StatusCodes } = require("http-status-codes");

const errorMiddleWare = (err, _req, res, _next) => {
  const { code } = err;

  return code
    ? res.status(code).json({ message: err.message })
    : res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
};

module.exports = errorMiddleWare;
