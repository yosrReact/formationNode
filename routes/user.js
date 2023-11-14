const express = require("express")
const router = express.Router()

const userController = require("../controllers/user")
const auth = require("../middleware/auth")

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/me", auth.loggedMiddleware, userController.me)

module.exports = router
