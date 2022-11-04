const { Schema, model: createModel } = require("mongoose");
const Model = require(".");

const UserSchema = new Schema({
  name: String,
  type: String,
  duration: String,
  creator: String,
  link: String,
  track: String,
  subTrack: String,
  likes: Number,
});

class UserModel extends Model {
  constructor(model = createModel("Users", UserSchema)) {
    super(model);
  }
}

module.exports = UserModel;
