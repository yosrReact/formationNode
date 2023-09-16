const fs = require("fs")
const Task = require("../models/task")

const fetchTasks = (req, res) => {
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((error) =>
      res.status(400).json({
        error,
        message: "problème d'extraction",
      })
    )
}

const addTask = (req, res) => {
  console.log("req.body.task: ", req.body.task)
  console.log(JSON.parse(req.body.task))
  const taskObject = JSON.parse(req.body.task)
  // res.json({
  //   message: "hello",
  // })
  delete taskObject._id

  const task = new Task({
    ...taskObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  })
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
        error,
        message: "Données invalides",
      })
    )
}

// const addTask = (req, res) => {
//   console.log(req.body)
//   delete req.body._id
//   const task = new Task({ ...req.body })
//   task
//     .save()
//     .then(() =>
//       res.status(201).json({
//         model: task,
//         message: "Objet créé !",
//       })
//     )
//     .catch((error) =>
//       res.status(400).json({
//         error,
//         message: "Données invalides",
//       })
//     )
// }

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
        task,
        message: "Objet trouvé",
      })
    })
    .catch((error) => res.status(404).json({ error }))
}

const updateTask = (req, res) => {
  console.log(req.params.id)
  console.log(req.body)

  const taskObject = req.file
    ? {
        ...JSON.parse(req.body.task),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }

  delete taskObject._id
  Task.findOneAndUpdate({ _id: req.params.id }, taskObject, { new: true })
    .then((task) => {
      if (!task) {
        res.status(404).json({
          message: "Objet non trouvé",
        })
        return
      }
      res.status(200).json({
        task,
        message: "Objet modifié",
      })
    })
    .catch((error) => res.status(400).json({ error }))
}

const deleteTask = (req, res) => {
  Task.findOne({ _id: req.params.id }).then((task) => {
    const filename = task.imageUrl.split("/images/")[1]
    fs.unlink(`images/${filename}`, () => {
      Task.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error }))
    })
  })
}

module.exports = {
  fetchTasks: fetchTasks,
  addTask: addTask,
  getTaskById: getTaskById,
  updateTask: updateTask,
  deleteTask: deleteTask,
}
