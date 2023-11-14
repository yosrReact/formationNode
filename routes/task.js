const express = require("express")

const router = express.Router()

const taskController = require("../controllers/task")

router.get("/", taskController.fetchTasks)
router.post("/", taskController.addTask)

router.get("/:id", taskController.getTaskById)

router.patch("/:id", taskController.updateTask)
router.put("/:id", taskController.updateTask)

router.delete("/:id", taskController.deleteTask)

module.exports = router
