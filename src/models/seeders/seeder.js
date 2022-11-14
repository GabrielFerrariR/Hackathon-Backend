const mongoose = require("mongoose");

const connectToDatabase = require("../connection");
const contentData = require("./contentData");
const userData = require("./userData");

const ContentModel = require("../ContentModel");
const UserModel = require("../UserModel");
const { getPreviewData } = require("../../helpers");

const contentModel = new ContentModel();
const userModel = new UserModel();

connectToDatabase()
  .then(() => {
    userModel.deleteMany({});
    contentModel.deleteMany({});
  })
  .then(() => Promise.all(
    contentData.map((content) => getPreviewData(content.link)
      .then((previewData) => ({ ...content, previewData }))),
  ))
  .then((contentWithPreview) => contentModel.insertMany(contentWithPreview))
  .then(() => userModel.insertMany(userData))
  .then(() => {
    mongoose.connection.close();
    console.log("Seed finished");
  })
  .catch((error) => console.error(error));
