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
    this.read = this.read.bind(this);
    this.validateUniqueEmail = this.validateUniqueEmail.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.toggleCompletedContent = this.toggleCompletedContent.bind(this);
  }

  async create(data) {
    const { email } = data;

    validateSchema(userRegistrationSchema, data);

    await this.validateUniqueEmail(email);

    return this.model.create({ ...data, isAdmin: false, completedContents: [] });
  }

  async validateUniqueEmail(email) {
    const doesEmailExist = await this.model.readEmail(email);

    if (doesEmailExist) throw new Conflict("Email already in use");
  }

  async validateLogin(data) {
    const { email, password } = data;

    const user = await this.model.readLogin(email, password);

    if (!user) throw new Unauthorized("The email or password is incorrect");

    return user;
  }

  async toggleCompletedContent(userId, contentId) {
    const user = await this.model.readById({ _id: userId });

    const { completedContents } = user;

    return completedContents.includes(contentId)
      ? this.model.removeCompletedContent(userId, contentId)
      : this.model.addCompletedContent(userId, contentId);
  }

  async read() {
    return this.model.readWithoutPassword();
  }
}

module.exports = UserService;
