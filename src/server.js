require("dotenv/config");

const App = require("./api");

const server = new App();

server.start();
