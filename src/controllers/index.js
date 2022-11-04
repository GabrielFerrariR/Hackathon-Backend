const { StatusCodes } = require("http-status-codes");

const controllerErrors = {
  internal: "Internal Server Error",
  notFound: "Object not found",
  requiredId: "Id is required",
  badRequest: "Bad request",
};

class Controller {
  constructor() {
    this.errors = controllerErrors;
  }

  async create(req, res, _next) {
    const { body } = req;

    try {
      const data = await this.service.create(body);

      if (!data) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: this.errors.badRequest });
      }

      return res.status(StatusCodes.CREATED).json(data);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: this.errors.internal });
    }
  }

  async read(_req, res, _next) {
    try {
      const result = await this.service.read();
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: this.errors.internal });
    }
  }

  async readOne(req, res, _next) {
    const { id } = req.params;

    try {
      const data = await this.service.readOne(id);

      return data
        ? res.status(StatusCodes.OK).json(data)
        : res.status(StatusCodes.NOT_FOUND).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: this.errors.internal });
    }
  }

  async update(req, res, _next) {
    const { id } = req.params;
    const { body } = req;

    try {
      const data = await this.service.update(id, body);

      return data
        ? res.status(StatusCodes.OK).json(data)
        : res.status(StatusCodes.NOT_FOUND).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: this.errors.internal });
    }
  }

  async delete(req, res, _next) {
    const { id } = req.params;

    try {
      const data = await this.service.delete(id);

      return data
        ? res.status(StatusCodes.OK).json(data)
        : res.status(StatusCodes.NOT_FOUND).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: this.errors.internal });
    }
  }
}

module.exports = Controller;
