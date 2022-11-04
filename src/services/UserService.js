const Service = require(".");
const UserModel = require("../models/UserModel");
const { validateUserRegistration } = require("./validations/responses");

class UserService extends Service {
  constructor() {
    super();
    this.model = new UserModel();

    this.create = this.create.bind(this);
  async create(data) {

    validateUserRegistration(data);

    return this.model.create(data);
  }
}

module.exports = UserService;
