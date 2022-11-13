const mongoose = require("mongoose");

const connectToDatabase = require("../connection");
const data = require("./contentData");
const ContentModel = require("../ContentModel");
const { getPreviewData } = require("../../helpers");

const contentModel = new ContentModel();

connectToDatabase()
  .then(() => contentModel.deleteMany({}))
  .then(() => Promise.all(
    data.map((content) => getPreviewData(content.link)
      .then((previewData) => ({ ...content, previewData }))),
  ))
  .then((contentWithPreview) => contentModel.insertMany(contentWithPreview))
  .then(() => {
    mongoose.connection.close();
    console.log("Seed finished");
  })
  .catch((error) => console.error(error));
