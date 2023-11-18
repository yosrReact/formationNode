const express = require("express")

const router = express.Router()

const taskController = require("../controllers/task")

const auth = require("../middleware/auth")
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: The Tasks managing API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     NewTask:
 *       type: object
 *       required:
 *         - title
 *         - duration
 *       properties:
 *         title:
 *           type: string
 *           description: The task title
 *         duration:
 *           type: string
 *           description: The task duration
 *         description:
 *           type: string
 *           description: The task description
 *       example:
 *         title: learn react
 *         duration: 130
 *         description: learn the fundamentals of react
 *     Task:
 *          allOf:
 *              - type: object
 *                properties:
 *                  _id:
 *                      type: string
 *                      description: The auto-generated id of the task
 *              - $ref: '#/components/schemas/NewTask'
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: List all the tasks
 *     tags: [Tasks]
 #*     security: []
 #*     security:
 #*          - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Task'
 *       401:
 *         $ref: '#/components/responses/401'
 */
router.get("/", taskController.fetchTasks)
// router.get("/", auth.loggedMiddleware, auth.isAdmin, taskController.fetchTasks)
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/NewTask'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request. You may need to verify your information.
 *       500:
 *         description: Some server error
 *
 */
router.post("/", taskController.addTask)
// router.post("/", auth.loggedMiddleware, taskController.addTask)

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: get a task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Task'
 *       404:
 *         description: Object not found
 *       500:
 *         description: Some server error
 *
 */
router.get("/:id", auth.loggedMiddleware, taskController.getTaskById)

router.patch("/:id", auth.loggedMiddleware, taskController.updateTask)

router.delete("/:id", auth.loggedMiddleware, taskController.deleteTask)

module.exports = router
