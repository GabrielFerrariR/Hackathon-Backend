const { StatusCodes } = require("http-status-codes");

class BadRequest extends Error {
  code = StatusCodes.BAD_REQUEST;

  constructor(message) {
    super();
    this.name = "BadRequest";
    this.message = message;
  }
}

module.exports = BadRequest;
