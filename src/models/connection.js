const mongoose = require("mongoose");
require("dotenv/config");

const BASE_URL = "mongodb://localhost:27017/orangeEvolution";

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI || BASE_URL,
) => mongoose.connect(mongoDatabaseURI);

module.exports = connectToDatabase;
