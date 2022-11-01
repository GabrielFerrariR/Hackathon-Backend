const express = require("express");
const testRoute = require("./routes/index");
//import routes from './routes';

class App {
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(express.json());
	}

	start(PORT) {
		this.server.listen(PORT, () => console.log(`Running on port ${PORT}`));
	}
	routes() {
		this.server.use(testRoute);
	}
}

module.exports =  new App() ;

