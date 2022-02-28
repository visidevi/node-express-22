const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cargar rutas
const hello_routers = require("./routes/test.js");
const task_routers = require("./routes/task.js");
// Rutas Base
app.use("/api", hello_routers);
app.use("/api", task_routers);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
module.exports = app;
