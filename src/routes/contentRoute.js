const { Router } = require("express");
const ContentController = require("../controllers/contentController");
const ContentService = require("../services/contentService");

const routes = new Router();
const contentService = new ContentService();
const contentController = new ContentController(contentService);

routes.get("/:track/:subtrack", (req, res) => contentController.show(req, res));
routes.post("/", (req, res) => contentController.create(req, res));
routes.put("/:id", (req, res) => contentController.edit(req, res));
routes.patch("/:id", (req, res) => contentController.update(req, res));
routes.delete("/:id", (req, res) => contentController.destroy(req, res));

module.exports = routes;
