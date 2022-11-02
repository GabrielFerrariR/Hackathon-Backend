const { Router } = require("express");

const routes = Router();

// Add routes
routes.get("/teste", (_req, res, _next) => res.status(200).send("Rotas funcionando"));

module.exports = routes;
