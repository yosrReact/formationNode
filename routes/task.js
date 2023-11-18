//*       401:
// *         $ref: '#/components/responses/401'

// *                  items:
//*                      $ref: '#/components/schemas/Task'

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
 *     newTask:
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
 *              - $ref: '#/components/schemas/newTask'
 */
//to disable security :  security: []
// #*     security:
//*          - bearerAuth: []

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: List all the tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              description: The auto-generated id of the task
 *                              example: 1dzf5f5jbjv5555
 *                          title:
 *                              type: string
 *                              description: The title of your task
 *                              example: learn react
 *                          duration:
 *                              type: string
 *                              description: The task duration
 *                              example: 150,
 *                          description:
 *                              type: string
 *                              description: The task description
 *                              example: learn the fundamentals of react
 *       500:
 *         description: Some server error
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
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      required: true
 *                      description: The task title
 *                      example: learn react
 *                  duration:
 *                      type: string
 *                      required: true
 *                      description: The task duration
 *                      example: 150,
 *                  description:
 *                      type: string
 *                      description: The task description
 *                      example: learn the fundamentals of react
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The auto-generated id of the task
 *                      example: 1dzf5f5jbjv5555
 *                  title:
 *                      type: string
 *                      description: The title of your task
 *                      example: learn react
 *                  duration:
 *                      type: string
 *                      description: The task duration
 *                      example: 150,
 *                  description:
 *                      type: string
 *                      description: The task description
 *                      example: learn the fundamentals of react
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
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The auto-generated id of the task
 *                      example: 1dzf5f5jbjv5555
 *                  title:
 *                      type: string
 *                      description: The title of your task
 *                      example: learn react
 *                  duration:
 *                      type: string
 *                      description: The task duration
 *                      example: 150,
 *                  description:
 *                      type: string
 *                      description: The task description
 *                      example: learn the fundamentals of react
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
