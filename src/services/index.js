class Service {
  async create(data) {
    return this.model.create(data);
  }

  async read() {
    return this.model.read();
  }

  async readOne(id) {
    return this.model.readOne(id);
  }

  async update(id, data) {
    return this.model.update(id, data);
  }

  async delete(id) {
    return this.model.delete(id);
  }
}

module.exports = Service;
