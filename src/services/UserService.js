const Service = require(".");
const Conflict = require("../errors/Conflict");
const Unauthorized = require("../errors/Unauthorized");
const UserModel = require("../models/UserModel");
const { validateSchema } = require("./validations/responses");
const { userRegistrationSchema } = require("./validations/schemas");

class UserService extends Service {
  constructor() {
    super();
    this.model = new UserModel();

    this.create = this.create.bind(this);
    this.validateUniqueUsername = this.validateUniqueUsername.bind(this);
    this.validateUniqueEmail = this.validateUniqueEmail.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.toggleCompletedContent = this.toggleCompletedContent.bind(this);
  }

  async create(data) {
    const { username, email } = data;

    validateSchema(userRegistrationSchema, data);

    await this.validateUniqueUsername(username);
    await this.validateUniqueEmail(email);

    return this.model.create(data);
  }

  async validateUniqueUsername(username) {
    const doesUsernameExist = await this.model.readUsername(username);

    if (doesUsernameExist) throw new Conflict("Username already in use");
  }

  async validateUniqueEmail(email) {
    const doesEmailExist = await this.model.readEmail(email);

    if (doesEmailExist) throw new Conflict("Email already in use");
  }

  async validateLogin(data) {
    const { username, password } = data;

    const user = await this.model.readLogin(username, password);

    if (!user) throw new Unauthorized("The username or password is incorrect");

    return user;
  }

  async toggleCompletedContent(userId, contentId) {
    const user = await this.model.readById({ _id: userId });

    const { completedContents } = user;

    return completedContents.includes(contentId)
      ? this.model.removeCompletedContent(userId, contentId)
      : this.model.addCompletedContent(userId, contentId);
  }
}

module.exports = UserService;
