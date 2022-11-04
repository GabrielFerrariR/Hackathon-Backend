const { default: mongoose } = require("mongoose");

class ContentService {
  constructor(model) {
    this.service = model;
  }

  async show(params) {
    const { track, subtrack } = params;
    if (!track || !subtrack) throw new Error("parametro ausente");
    const result = await this.model.find({ track, subtrack });
    return result;
  }

  async create(body) {
    if (!body) throw new Error("parametro ausente");
    const result = await this.model.create(body);
    return result;
  }

  async edit(id, body) {
    mongoose.isValidObjectId(id);
    const result = await this.model.find(id, body);
    return result;
  }

  async update(id, body) {
    mongoose.isValidObjectId(id);
    const result = await this.model.update(id, body);
    return result;
  }

  async destroy(id) {
    mongoose.isValidObjectId(id);
    const result = await this.model.destroy(id);
    return result;
  }
}

module.exports = ContentService;
