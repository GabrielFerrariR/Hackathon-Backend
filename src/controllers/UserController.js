const { StatusCodes } = require("http-status-codes");

const Controller = require(".");
const UserService = require("../services/UserService");

class UserController extends Controller {
  constructor() {
    super();
    this.service = new UserService();
    this.route = "/user";

    this.create = super.create.bind(this);
    this.read = super.read.bind(this);
    this.readOne = super.readOne.bind(this);
    this.update = super.update.bind(this);
    this.delete = super.delete.bind(this);
    this.toggleCompletedContent = this.toggleCompletedContent.bind(this);
  }

  async toggleCompletedContent(req, res, _next) {
    const { id, contentId } = req.params;

    await this.service.toggleCompletedContent(id, contentId);

    return res.status(StatusCodes.OK).end();
  }
}

module.exports = UserController;
