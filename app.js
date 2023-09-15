const express = require("express")
const mongoose = require("mongoose")
const Task = require("./models/task")
//?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://yosrnaija:atlas123456@clustertraining.9mnhiji.mongodb.net/training",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"))
const app = express()

/*
Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json 
et met à disposition leur  body  directement sur l'objet req, 
ce qui nous permet d'écrire le middleware POST
*/
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  )
  next()
})
/*remplacer use car car la logique GET interceptera 
 actuellement toutes les requêtes envoyées à votre endpoint 
 */
app.get("/api/tasks/", (req, res) => {
  //   const tasks = [
  //     {
  //       _id: "1",
  //       title: "learn js",
  //       duration: "30",
  //     },
  //     {
  //       _id: "2",
  //       title: "learn nodeJS",
  //       duration: "40",
  //     },
  //     {
  //       _id: "3",
  //       title: "learn react",
  //       duration: "60",
  //     },
  //   ]
  // res.status(200).json(tasks)
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((error) =>
      res.status(400).json({
        error,
        message: "problème d'extraction",
      })
    )
})
//the __v field increments by one only when an array is updated. In other situations, the value of the __v field remains unaffected
app.post("/api/tasks", (req, res) => {
  console.log(req.body)
  delete req.body._id
  // const _id = Math.random() + ""
  const task = new Task({ ...req.body })
  // res.status(201).json({
  //   model: { _id, ...req.body },
  //   message: "Objet créé !",
  // })
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
})

app.get("/api/tasks/:id", (req, res) => {
  // nous pouvons rechercher par n'importe quel champ du schema (ex.title) ou une combinaison de ces champs
  // le plus important est que la condition de recherche a soit sous forme d'objet
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
})
module.exports = app
