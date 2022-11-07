const Service = require(".");
const Conflict = require("../errors/Conflict");
const Unauthorized = require("../errors/Unauthorized");
const UserModel = require("../models/UserModel");
const { validateUserRegistration } = require("./validations/responses");

class UserService extends Service {
  constructor() {
    super();
    this.model = new UserModel();

    this.create = this.create.bind(this);
    this.readOne = this.readOne.bind(this);
    this.validateUniqueUsername = this.validateUniqueUsername.bind(this);
    this.validateUniqueEmail = this.validateUniqueEmail.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  async create(data) {
    const { username, email } = data;

    validateUserRegistration(data);

    await this.validateUniqueUsername(username);
    await this.validateUniqueEmail(email);

    return this.model.create(data);
  }

  async readOne(data) {
    const { username, password } = data;

    return this.validateLogin(username, password);
  }

  async validateUniqueUsername(username) {
    const doesUsernameExist = await this.model.readUsername(username);

    if (doesUsernameExist) throw new Conflict("Username already in use");
  }

  async validateUniqueEmail(email) {
    const doesEmailExist = await this.model.readEmail(email);

    if (doesEmailExist) throw new Conflict("Email already in use");
  }

  async validateLogin(username, password) {
    const user = await this.model.readLogin(username, password);

    if (!user) throw new Unauthorized("The username or password is incorrect");

    return user;
  }
}

module.exports = UserService;
