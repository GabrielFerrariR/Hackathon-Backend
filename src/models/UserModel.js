const { Schema, model: createModel, default: mongoose } = require("mongoose");
const Model = require(".");

const UserSchema = new Schema({
  password: String,
  name: String,
  email: String,
  isAdmin: Boolean,
  completedContents: [mongoose.Types.ObjectId],
});

class UserModel extends Model {
  constructor(model = createModel("Users", UserSchema)) {
    super(model);

    this.read = this.read.bind(this);
    this.readById = this.readById.bind(this);
    this.readEmail = this.readEmail.bind(this);
    this.readLogin = this.readLogin.bind(this);
    this.addCompletedContent = this.addCompletedContent.bind(this);
    this.removeCompletedContent = this.removeCompletedContent.bind(this);
  }

  async read() {
    return this.model.find({}, { password: 0 });
  }

  async readById(id) {
    return this.model.findById(id, { password: 0 });
  }

  async readEmail(email) {
    return this.model.findOne({ email });
  }

  async readLogin(email, password) {
    return this.model.findOne({ email, password }, { password: 0 });
  }

  async addCompletedContent(userId, contentId) {
    return this.model.findByIdAndUpdate(
      userId,
      { $addToSet: { completedContents: contentId } },
      { select: { _id: 0, completedContents: 1 }, new: true },
    );
  }

  async removeCompletedContent(userId, contentId) {
    return this.model.findByIdAndUpdate(
      userId,
      { $pull: { completedContents: contentId } },
      { select: { _id: 0, completedContents: 1 }, new: true },
    );
  }
}

module.exports = UserModel;
