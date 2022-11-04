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
  }
}

module.exports = UserModel;
