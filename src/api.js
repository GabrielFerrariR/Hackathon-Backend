const express = require("express");
require("express-async-errors");
const cors = require("cors");

const connectToDatabase = require("./models/connection");
const router = require("./routes/Router");

class App {
  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.app.use(cors());
  }

  start(port) {
    const actualPort = process.env.PORT || port;

    connectToDatabase()
      .then(() => this.app.listen(
        actualPort,
        () => console.log(`Running on port: ${actualPort}`),
      ))
      .catch((error) => {
        console.log("Connection with database generated an error:\r\n");
        console.error(error);
        console.log("\r\nServer initialization cancelled");
        process.exit(0);
      });
  }

  addRouter() {
    this.app.use(router);
  }
}

module.exports = App;
