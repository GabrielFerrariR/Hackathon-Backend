require("dotenv/config");
const contentRoute = require("./routes/contentRoute");
const App = require("./api");

const server = new App();

server.addRouter(contentRoute);
server.start();
