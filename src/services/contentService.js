const Service = require(".");
const ContentModel = require("../models/ContentModel");

class ContentService extends Service {
  constructor() {
    super();
    super.model = new ContentModel();
    this.read = this.read.bind(this);
  }

  async read(params) {
    const { track, subtrack } = params;
    const result = await this.model.read({ track, subtrack });
    return result;
  }
}

module.exports = ContentService;
