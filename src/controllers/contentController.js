const { StatusCodes } = require("http-status-codes");
const Controller = require(".");
const ContentService = require("../services/contentService");

class ContentController extends Controller {
  constructor() {
    super();
    this.service = new ContentService();
    this.route = "/content";

    this.create = super.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = super.readOne.bind(this);
    this.update = super.update.bind(this);
    this.delete = super.delete.bind(this);
  }

  async read(req, res, _next) {
    const { params } = req;
    const result = await this.service.read(params);
    return res.status(StatusCodes.OK).json(result);
  }
}

module.exports = ContentController;
