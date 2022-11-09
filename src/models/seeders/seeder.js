const mongoose = require("mongoose");
const connectToDatabase = require("../connection");
const data = require("./contentData");
const ContentModel = require("../ContentModel");

const contentModel = new ContentModel();

connectToDatabase().then(() => {
  console.log("connected");
}).catch((error) => {
  console.error(error);
});

const seed = async () => {
  await contentModel.deleteMany({});
  await contentModel.insertMany(data);
};

seed().then(() => {
  mongoose.connection.close();
  console.log("seed finished");
}).catch((error) => {
  console.error(error);
});
