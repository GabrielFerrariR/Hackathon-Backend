const express = require("express");
const testRoute = require("./routes/index");

const app = express();

app.use(express.json());
app.use(testRoute);

module.exports = app;
