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
app.get("/api/tasks/", async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json({ model: tasks, message: "succès" })
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "problème d'extraction",
    })
  }
})
//the __v field increments by one only when an array is updated. In other situations, the value of the __v field remains unaffected
app.post("/api/tasks", async (req, res) => {
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
})
app.get("/api/tasks/:id", async (req, res) => {
  // nous pouvons rechercher par n'importe quel champ du schema (ex.title) ou une combinaison de ces champs
  // le plus important est que la condition de recherche a soit sous forme d'objet
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
})

app.patch("/api/tasks/:id", async (req, res) => {
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
})

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "Objet supprimé !" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = app
