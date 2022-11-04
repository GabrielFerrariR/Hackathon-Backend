require("dotenv/config");
require("express-async-errors");
const contentRoute = require("./routes/contentRoute");
const App = require("./api");

const server = new App();

server.addRouter(contentRoute);
server.useErrorMiddleware();
server.start();
