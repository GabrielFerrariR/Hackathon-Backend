class Model {
  async create(obj) {
    return this.model.create({ ...obj });
  }

  async read() {
    return this.model.find();
  }

  async readOne(id) {
    return this.model.findOne({ _id: id });
  }

  async update(id, obj) {
    return this.model.findOneAndUpdate({ _id: id }, { ...obj }, { new: true });
  }

  async delete(id) {
    return this.model.findOneAndDelete({ _id: id });
  }
}

module.exports = Model;
