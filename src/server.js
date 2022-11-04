require("dotenv/config");

const App = require("./api");
const userRouter = require("./routes/UserRouter");

const server = new App();

server.addRouter(userRouter);

server.start();
