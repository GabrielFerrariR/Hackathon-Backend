const { Schema, model: createModel } = require("mongoose");
const Model = require(".");

const UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  isAdmin: Boolean,
});

class UserModel extends Model {
  constructor(model = createModel("Users", UserSchema)) {
    super(model);

    this.readUsername = this.readUsername.bind(this);
    this.readEmail = this.readEmail.bind(this);
    this.readLogin = this.readLogin.bind(this);
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
}

module.exports = UserModel;
