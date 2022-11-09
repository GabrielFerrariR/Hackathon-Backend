const mongoose = require("mongoose");
const connectToDatabase = require("../connection");
const data = require("./contentData");
const ContentModel = require("../ContentModel");
const { getPreviewData } = require("../../helpers");

const contentModel = new ContentModel();

connectToDatabase().then(() => {
  console.log("connected");
}).catch((error) => {
  console.error(error);
});

const seed = async () => {
  await contentModel.deleteMany({});
  const contentWithPreview = await Promise.all(data.map(async (content) => {
    const { link } = content;
    const previewData = await getPreviewData(link);
    return { ...data, previewData };
  }));
  await contentModel.insertMany(contentWithPreview);
};

seed().then(() => {
  mongoose.connection.close();
  console.log("seed finished");
}).catch((error) => {
  console.error(error);
});
