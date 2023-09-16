const express = require("express")

const router = express.Router()

const taskController = require("../controllers/task")

const auth = require("../middleware/auth")

/*remplacer use car car la logique GET interceptera 
 actuellement toutes les requêtes envoyées à votre endpoint 
 */
router.get("/", auth.loggedMiddleware, taskController.fetchTasks)
router.post("/", auth.loggedMiddleware, taskController.addTask)

router.get("/:id", auth.loggedMiddleware, taskController.getTaskById)

router.patch("/:id", auth.loggedMiddleware, taskController.updateTask)

router.delete("/:id", auth.loggedMiddleware, taskController.deleteTask)

module.exports = router
