const { StatusCodes } = require("http-status-codes");

class Conflict extends Error {
  code = StatusCodes.CONFLICT;

  constructor(message) {
    super();
    this.name = "Conflict";
    this.message = message;
  }
}

module.exports = Conflict;
