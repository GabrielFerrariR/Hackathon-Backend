// const { Router } = require("express");
// const ContentController = require("../controllers/contentController");
// const ContentService = require("../services/contentService");

// const routes = new Router();
// const contentService = new ContentService();
// const contentController = new ContentController(contentService);

// routes.get("/:track/:subtrack", (req, res) => contentController.show(req, res));
// routes.post("/", (req, res) => contentController.create(req, res));
// routes.put("/:id", (req, res) => contentController.edit(req, res));
// routes.patch("/:id", (req, res) => contentController.update(req, res));
// routes.delete("/:id", (req, res) => contentController.destroy(req, res));
const ContentController = require("../controllers/ContentController");
const CustomRouter = require("./Router");

class ContentRouter extends CustomRouter {
  constructor() {
    super();
    this.addController = this.addController.bind(this);
  }

  addController(controller, route = controller.route) {
    this.router.post(route, controller.create);
    this.router.get(`${route}/:track/:subtrack`, controller.read);
    this.router.get(`${route}/:id`, controller.readById);
    this.router.put(`${route}/:id`, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}

const contentController = new ContentController();
const contentRouter = new ContentRouter();

contentRouter.addController(contentController);

module.exports = contentRouter.router;
