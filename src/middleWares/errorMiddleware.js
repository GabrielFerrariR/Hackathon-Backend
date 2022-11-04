const { StatusCodes } = require("http-status-codes");

const errorMiddleWare = (err, req, res, _next) => {
  const { code } = err;
  if (code) return res.status(code).json({ message: err.message });
  if (err.name === "JsonWebTokenError") {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token must be a valid token" });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

module.exports = errorMiddleWare;
