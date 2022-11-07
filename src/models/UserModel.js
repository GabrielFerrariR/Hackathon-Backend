const { Schema, model: createModel, default: mongoose } = require("mongoose");
const Model = require(".");

const UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  isAdmin: Boolean,
  completedContents: [mongoose.Types.ObjectId],
});

class UserModel extends Model {
  constructor(model = createModel("Users", UserSchema)) {
    super(model);

    this.readUsername = this.readUsername.bind(this);
    this.readEmail = this.readEmail.bind(this);
    this.readLogin = this.readLogin.bind(this);
    this.addCompletedContent = this.addCompletedContent.bind(this);
    this.removeCompletedContent = this.removeCompletedContent.bind(this);
  }

  async readUsername(username) {
    return this.model.findOne({ username });
  }

  async readEmail(email) {
    return this.model.findOne({ email });
  }

  async readLogin(username, password) {
    return this.model.findOne({ username, password });
  }

  async addCompletedContent(userId, contentId) {
    return this.model.updateOne({ _id: userId }, { $addToSet: { completedContents: contentId } });
  }

  async removeCompletedContent(userId, contentId) {
    return this.model.updateOne({ _id: userId }, { $pull: { completedContents: contentId } });
  }
}

module.exports = UserModel;
