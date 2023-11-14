const express = require("express")

const app = express()

/*
Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json 
et met à disposition leur  body  directement sur l'objet req, 
ce qui nous permet d'écrire le middleware POST
*/
app.use(express.json())

/* on peut aussi installer le package "cors"  et faire app.use("cors") */

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
app.use("/api/tasks", (req, res, next) => {
  console.log("fetch tasks")
  res.status(200).json({ message: "succès" })
})

app.post("/api/tasks", (req, res) => {
  console.log(req.body)

  res.status(201).json({
    message: "Objet créé !",
  })
})
module.exports = app
