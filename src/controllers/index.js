const { StatusCodes } = require("http-status-codes");

class Controller {
  async create(req, res, _next) {
    const { body } = req;
    const data = await this.service.create(body);
    return res.status(StatusCodes.CREATED).json(data);
  }

  async read(_req, res, _next) {
    const result = await this.service.read();
    return res.status(StatusCodes.OK).json(result);
  }

  async readOne(req, res, _next) {
    const { id } = req.params;
    const data = await this.service.readOne(id);
    res.status(StatusCodes.OK).json(data);
  }

  async update(req, res, _next) {
    const { id } = req.params;
    const { body } = req;
    const data = await this.service.update(id, body);
    res.status(StatusCodes.OK).json(data);
  }

  async delete(req, res, _next) {
    const { id } = req.params;
    const data = await this.service.delete(id);
    res.status(StatusCodes.OK).json(data);
  }
}

module.exports = Controller;
