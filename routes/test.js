const express = require("express");

const HelloController = require("../controllers/test.js");
const api = express.Router();
api.get("/hello", HelloController.getHello);

module.exports = api;
