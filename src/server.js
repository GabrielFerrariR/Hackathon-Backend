require("dotenv/config");
require("express-async-errors");
const contentRoute = require("./routes/contentRoute");
const App = require("./api");
const userRouter = require("./routes/UserRouter");

const server = new App();

server.addRouter(userRouter);
server.addRouter(contentRoute);
server.useErrorMiddleware();

server.start();
