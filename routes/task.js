const express = require("express")

const router = express.Router()

const taskController = require("../controllers/task")

/*remplacer use car car la logique GET interceptera 
 actuellement toutes les requêtes envoyées à votre endpoint 
 */
router.get("/", taskController.fetchTasks)
router.post("/", taskController.addTask)

router.get("/:id", taskController.getTaskById)

router.patch("/:id", taskController.updateTask)

router.delete("/:id", taskController.deleteTask)

module.exports = router
