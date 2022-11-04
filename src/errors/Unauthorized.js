const { StatusCodes } = require("http-status-codes");

class Unauthorized extends Error {
  code = StatusCodes.UNAUTHORIZED;

  constructor(message) {
    super();
    this.name = "Unauthorized";
    this.message = message;
  }
}

module.exports = Unauthorized;
