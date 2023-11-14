const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose")
const taskRoutes = require("./routes/task")
const userRoutes = require("./routes/user")

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

// app.use(cors())

app.use("/api/tasks/", taskRoutes)
app.use("/api/auth/", userRoutes)

module.exports = app
