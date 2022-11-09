const { Router } = require("express");

class CustomRouter {
  constructor() {
    this.router = Router();

    this.addController = this.addController.bind(this);
  }

  addController(controller, route = controller.route) {
    this.router.post(route, controller.create);
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readById);
    this.router.put(`${route}/:id`, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}

module.exports = CustomRouter;
