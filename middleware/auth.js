const jwt = require("jsonwebtoken")
const User = require("../models/user")

module.exports.loggedMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log("token: ", token)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
    const userId = decodedToken.userId
    User.findOne({ _id: userId })
      .then((response) => {
        if (response) {
          req.auth = {
            userId: userId,
            role: response.role,
          }
          next()
        } else {
          res.status(401).json({ error: "user doesn't exist" })
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message })
      })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

module.exports.isAdmin = (req, res, next) => {
  try {
    if (req.auth.role === "admin") {
      next()
    } else {
      res.status(403).json({ error: "no access to this route" })
    }
  } catch (e) {
    res.status(401).json({ error: error.message })
  }
}
