const Task = require("../models/task")

const fetchTasks = (req, res) => {
  Task.find()
    .then((tasks) =>
      res.status(200).json({
        model: tasks,
        message: "success",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error: error.message,
        message: "problème d'extraction",
      })
    )
}
const addTask = (req, res) => {
  console.log(req.body)
  delete req.body._id
  const task = new Task({ ...req.body })
  task
    .save()
    .then(() =>
      res.status(201).json({
        model: task,
        message: "Objet créé !",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error: error.message,
        message: "Données invalides",
      })
    )
}

const getTaskById = (req, res) => {
  Task.findOne({ _id: req.params.id })
    .then((task) => {
      if (!task) {
        res.status(404).json({
          message: "Objet non trouvé",
        })
        return
      }
      res.status(200).json({
        model: task,
        message: "Objet trouvé",
      })
    })
    .catch((error) => res.status(404).json({ error: error.message }))
}

const updateTask = (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  delete req.body._id

  Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((task) => {
      if (!task) {
        res.status(404).json({
          message: "Objet non trouvé",
        })
        return
      }
      res.status(200).json({
        model: task,
        message: "Objet modifié",
      })
    })
    .catch((error) => res.status(400).json({ error: error.message }))
}

const deleteTask = (req, res) => {
  Task.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error: error.message }))
}

module.exports = {
  fetchTasks: fetchTasks,
  addTask: addTask,
  getTaskById: getTaskById,
  updateTask: updateTask,
  deleteTask: deleteTask,
}
