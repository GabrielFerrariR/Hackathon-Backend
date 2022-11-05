const Controller = require(".");
const UserService = require("../services/UserService");

class UserController extends Controller {
  constructor() {
    super();
    this.service = new UserService();
    this.route = "/user";

    this.create = super.create.bind(this);
    this.read = super.read.bind(this);
    this.readById = super.readById.bind(this);
    this.update = super.update.bind(this);
    this.delete = super.delete.bind(this);
  }
}

module.exports = UserController;
