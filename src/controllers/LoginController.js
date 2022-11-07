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
    const data = await this.service.readOne(body);
    res.status(StatusCodes.OK).json(data);
  }
}

module.exports = LoginController;
