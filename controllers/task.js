const Task = require("../models/task");

async function createTask(req, res) {
  const { title, description } = req.body;
  const task = new Task();
  task.title = title;
  task.description = description;
  try {
    const taskStore = await task.save();
    if (!taskStore) {
      res.status(404).send({ message: "Error al crear la tarea" });
    } else {
      res.status(201).json(taskStore);
    }
  } catch (error) {
    res.status(500).send({ message: `Error al crear la tarea ${error}` });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ completed: false }).sort({
      created_at: -1,
    });
    if (!tasks) {
      res.status(404).send({ message: "No hay tareas" });
    } else {
      res.status(200).json(tasks);
    }
  } catch (error) {
    res.status(500).send({ message: `Error al obtener las tareas ${error}` });
  }
}
async function getTask(req, res) {
  try {
    console.log(req.params.id);
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).send({ message: "No hay tarea" });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
async function updateTask(req, res) {
  try {
    console.log(req.params.id);
    const params = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, params);
    if (!task) {
      res.status(404).send({ message: "No hay tarea" });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send({ message: "No se pudo eliminar" });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}


module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
