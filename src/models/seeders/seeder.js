const mongoose = require("mongoose");

const connectToDatabase = require("../connection");
const data = require("./contentData");
const ContentModel = require("../ContentModel");
const { getPreviewData } = require("../../helpers");

const contentModel = new ContentModel();

const seed = async () => {
  try {
    await connectToDatabase();

    await contentModel.deleteMany({});

    const contentWithPreview = await Promise.all(data.map(async (content) => {
      const { link } = content;
      const previewData = await getPreviewData(link);

      return { ...content, previewData };
    }));

    await contentModel.insertMany(contentWithPreview);

    mongoose.connection.close();
    console.log("seed finished");
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
