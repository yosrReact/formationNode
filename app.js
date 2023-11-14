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
app.get("/api/tasks/", (req, res) => {
  const tasks = [
    {
      _id: "1",
      title: "learn js",
      duration: "30",
    },
    {
      _id: "2",
      title: "learn nodeJS",
      duration: "40",
    },
    {
      _id: "3",
      title: "learn react",
      duration: "60",
    },
  ]
  res.status(200).json(tasks)
})

app.post("/api/tasks", (req, res) => {
  console.log(req.body)
  delete req.body._id
  const _id = Math.random() + ""

  res.status(201).json({
    model: { _id, ...req.body },
    message: "Objet créé !",
  })
})
module.exports = app
