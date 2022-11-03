const express = require("express");
require("express-async-errors");
const cors = require("cors");
const testRoute = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cors());
app.use(testRoute);

module.exports = app;
