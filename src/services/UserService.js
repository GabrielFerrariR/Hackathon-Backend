const Service = require(".");
const UserModel = require("../models/UserModel");

class UserService extends Service {
  constructor() {
    super();
    this.model = new UserModel();

    this.create = this.create.bind(this);
  }
}

module.exports = UserService;
