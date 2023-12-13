const Task = require("../models/task")

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json({ model: tasks, message: "succès" })
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "problème d'extraction",
    })
  }
}
const addTask = async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()

    res.status(201).json({
      model: task,
      message: "Objet créé !",
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Données invalides",
    })
  }
}

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id })
    if (!task) {
      res.status(404).json({
        message: "Objet non trouvé",
      })
    } else {
      res.status(200).json({
        model: task,
        message: "Objet trouvé",
      })
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
    if (!task) {
      res.status(404).json({
        message: "Objet non trouvé",
      })
    } else {
      res.status(200).json({
        model: task,
        message: "Objet modifié",
      })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "Objet supprimé !" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  fetchTasks: fetchTasks,
  addTask: addTask,
  getTaskById: getTaskById,
  updateTask: updateTask,
  deleteTask: deleteTask,
}
