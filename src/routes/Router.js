const { Router } = require("express");

class CustomRouter {
  constructor() {
    this.router = Router();

    this.addRoute = this.addRoute.bind(this);
  }

  addRoute(controller, route = controller.route) {
    this.router.post(route, controller.create);
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.put(`${route}/:id`, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}

module.exports = CustomRouter;
