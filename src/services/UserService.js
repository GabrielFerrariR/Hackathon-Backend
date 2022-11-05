const Service = require(".");
const Conflict = require("../errors/Conflict");
const UserModel = require("../models/UserModel");
const { validateUserRegistration } = require("./validations/responses");

class UserService extends Service {
  constructor() {
    super();
    this.model = new UserModel();

    this.create = this.create.bind(this);
    this.validateUniqueUsername = this.validateUniqueUsername.bind(this);
    this.validateUniqueEmail = this.validateUniqueEmail.bind(this);
  }

  async create(data) {
    const { username, email } = data;

    validateUserRegistration(data);

    await this.validateUniqueUsername(username);
    await this.validateUniqueEmail(email);

    return this.model.create(data);
  }

  async validateUniqueUsername(username) {
    const doesUsernameExist = await this.model.findUsername(username);

    if (doesUsernameExist) throw new Conflict("Username already in use");
  }

  async validateUniqueEmail(email) {
    const doesEmailExist = await this.model.findEmail(email);

    if (doesEmailExist) throw new Conflict("Email already in use");
  }
}

module.exports = UserService;
