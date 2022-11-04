const express = require("express");
require("express-async-errors");
const cors = require("cors");

const connectToDatabase = require("./models/connection");
const errorMiddleWare = require("./middleWares/errorMiddleware");

class App {
  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(cors());
  }

  start(port = process.env.PORT) {
    connectToDatabase()
      .then(() => this.app.listen(
        port,
        () => console.log(`Running on port: ${port}`),
      ))
      .catch((error) => {
        console.log("Connection with database generated an error:\r\n");
        console.error(error);
        console.log("\r\nServer initialization cancelled");
        process.exit(0);
      });
  }

  addRouter(router) {
    this.app.use(router);
  }

  useErrorMiddleware() {
    this.app.use(errorMiddleWare);
  }
}

module.exports = App;
