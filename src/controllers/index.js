const { StatusCodes } = require("http-status-codes");

class Controller {
  async create(req, res, _next) {
    const { body } = req;
    await this.service.create(body);

    return res.status(StatusCodes.CREATED).end();
  }

  async read(_req, res, _next) {
    const result = await this.service.read();

    return res.status(StatusCodes.OK).json(result);
  }

  async readById(req, res, _next) {
    const { id } = req.params;
    const data = await this.service.readById(id);

    return res.status(StatusCodes.OK).json(data);
  }

  async update(req, res, _next) {
    const { params: id, body } = req;
    await this.service.update(id, body);

    return res.status(StatusCodes.OK).end();
  }

  async delete(req, res, _next) {
    const { id } = req.params;
    await this.service.delete(id);

    return res.status(StatusCodes.OK).end();
  }
}

module.exports = Controller;
