const { Schema, model: createModel } = require("mongoose");
const Model = require(".");

const ContentSchema = new Schema({
  name: String,
  type: String,
  duration: String,
  creator: String,
  link: String,
  track: String,
  subTrack: String,
  likes: Number,
});

class ContentModel extends Model {
  constructor(model = createModel("Content", ContentSchema)) {
    super(model);
    this.read = this.read.bind(this);
  }

  async read(params) {
    return this.model.find(params);
  }
}

module.exports = ContentModel;
