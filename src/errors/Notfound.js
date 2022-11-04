const { StatusCodes } = require("http-status-codes");

class NotFound extends Error {
  code = StatusCodes.NOT_FOUND;

  constructor(message) {
    super();
    this.name = "NotFound";
    this.message = message;
  }
}
module.exports = NotFound;
