const Service = require(".");
const ContentModel = require("../models/ContentModel");
const { contentSchema } = require("./validations/schemas");
const { validateSchema } = require("./validations/responses");
const { getPreviewData } = require("../helpers");
const BadRequest = require("../errors/BadRequest");

class ContentService extends Service {
  constructor() {
    super();
    this.model = new ContentModel();

    this.read = this.read.bind(this);
    this.create = this.create.bind(this);
  }

  async read(params) {
    const { track, subtrack } = params;

    const result = await this.model.read({ $and: [{ track }, { subTrack: subtrack }] });

    return result;
  }

  async create(data) {
    const { link } = data;

    validateSchema(contentSchema, data);

    const previewData = await getPreviewData(link);
    const content = { ...data, previewData };

    const result = await this.model.create(content);

    return result;
  }

  async likeContent(id) {
    const result = await this.model.like(id);
    if (!result) throw new BadRequest("Content not found.");
    const { _id, likes } = result;
    return { _id, likes };
  }

  async dislikeContent(id) {
    const result = await this.model.dislike(id);
    if (!result) throw new BadRequest("Content not found.");
    const { _id, likes } = result;
    return { _id, likes };
  }
}

module.exports = ContentService;
