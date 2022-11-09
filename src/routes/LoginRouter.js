const { Router } = require("express");

const LoginController = require("../controllers/LoginController");

class LoginRouter {
  constructor() {
    this.router = Router();

    this.addController = this.addController.bind(this);
  }

  addController(controller, route = controller.route) {
    this.router.post(route, controller.create);
  }
}

const loginRouter = new LoginRouter();
const loginController = new LoginController();

loginRouter.addController(loginController);

module.exports = loginRouter.router;
