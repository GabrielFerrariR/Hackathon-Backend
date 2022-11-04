require("dotenv/config");
require("express-async-errors");

const App = require("./api");
const contentRouter = require("./routes/ContentRouter");
const userRouter = require("./routes/UserRouter");

const server = new App();

server.addRouter(userRouter);
server.addRouter(contentRouter);

server.useErrorMiddleware();

server.start();
