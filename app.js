const express = require("express")

const app = express()
// app.use((req, res) => {
//   res.json({ message: "Votre requête a bien été reçue !" })
// })

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

app.use("/api/todos/", (req, res, next) => {
  const todos = [
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
  res.status(200).json(todos)
})

module.exports = app
