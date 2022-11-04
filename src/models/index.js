class Model {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create({ ...data });
  }

  async read() {
    return this.model.find();
  }

  async readOne(id) {
    return this.model.findOne({ _id: id });
  }

  async update(id, data) {
    return this.model.findOneAndUpdate({ _id: id }, { ...data }, { new: true });
  }

  async delete(id) {
    return this.model.findOneAndDelete({ _id: id });
  }
}

module.exports = Model;
