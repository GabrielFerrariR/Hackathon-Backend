class ContentController {
  constructor(service) {
    this.service = service;
  }

  async show(req, res) {
    const { params } = req;
    const result = await this.service.show(params);
    return res.status(200).json(result);
  }

  async create(req, res) {
    const { body } = req;
    const result = await this.service.create(body);
    return res.status(201).json(result);
  }

  async edit(req, res) {
    const { id } = req.params;
    const { body } = req;
    await this.service.edit(id, body);
    return res.json();
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    await this.service.update(id, body);
    return res.json();
  }

  async destroy(req, res) {
    const { id } = req.params;
    await this.service.destroy(id);
    return res.json();
  }
}

module.exports = ContentController;
