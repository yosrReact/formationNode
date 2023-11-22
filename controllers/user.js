const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
exports.signup = (req, res, next) => {
  console.log("body:", req.body)
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        ...req.body,
        password: hash,
      })
      user
        .save()
        .then((response) => {
          // const { password, ...newUser } = response
          // console.log("response: ", response)
          const newUser = response.toObject()
          delete newUser.password
          res.status(201).json({
            model: newUser,
            message: "Utilisateur créé !",
          })
        })
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Login ou mot de passe incorrecte" })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Login ou mot de passe incorrecte" })
          }
          res.status(200).json({
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: process.env.EXPIRES_IN,
            }),
          })
        })
        .catch((error) => res.status(500).json({ error: error.message }))
    })
    .catch((error) => res.status(500).json({ error: error.message + "ddd" }))
}
