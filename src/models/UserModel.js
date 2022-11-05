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

    this.findUsername = this.findUsername.bind(this);
    this.findEmail = this.findEmail.bind(this);
  }

  async findUsername(username) {
    return this.model.findOne({ username });
  }

  async findEmail(email) {
    return this.model.findOne({ email });
  }
}

module.exports = UserModel;
