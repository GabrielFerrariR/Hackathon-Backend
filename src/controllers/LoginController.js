const { StatusCodes } = require("http-status-codes");

const UserService = require("../services/UserService");

class LoginController {
  constructor() {
    this.service = new UserService();
    this.route = "/login";

    this.create = this.create.bind(this);
  }

  async create(req, res, _next) {
    const { body } = req;
    await this.service.validateLogin(body);
    res.status(StatusCodes.OK).end();
  }
}

module.exports = LoginController;
