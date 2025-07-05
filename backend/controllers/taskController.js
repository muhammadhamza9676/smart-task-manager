const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  getDueSoonTasks,
} = require('../services/taskService');

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, maxLength: 100 }
 *               description: { type: string, maxLength: 500 }
 *               category: { type: string, enum: [Work, Personal, Learning, Other] }
 *               deadline: { type: string, format: date-time }
 *     responses:
 *       201: { description: Task created }
 *       400: { description: Invalid input }
 *       401: { description: Unauthorized }
 */
const create = async (req, res, next) => {
  try {
    const { title, description, category, deadline } = req.body;
    if (!title) {
      const error = new Error('Title is required');
      error.statusCode = 400;
      throw error;
    }
    const task = await createTask({ title, description, category, deadline }, req.user.id);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string, enum: [Work, Personal, Learning, Other] }
 *         description: Filter by category
 *       - in: query
 *         name: dueBefore
 *         schema: { type: string, format: date-time }
 *         description: Filter tasks due before this date
 *     responses:
 *       200: { description: List of tasks }
 *       401: { description: Unauthorized }
 */
const getAll = async (req, res, next) => {
  try {
    const { category, dueBefore } = req.query;
    const tasks = await getTasks(req.user.id, { category, dueBefore });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Task ID
 *     responses:
 *       200: { description: Task details }
 *       404: { description: Task not found }
 *       401: { description: Unauthorized }
 */
const getById = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id, req.user.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, maxLength: 100 }
 *               description: { type: string, maxLength: 500 }
 *               category: { type: string, enum: [Work, Personal, Learning, Other] }
 *               deadline: { type: string, format: date-time }
 *               completed: { type: boolean }
 *     responses:
 *       200: { description: Updated task }
 *       400: { description: Invalid input }
 *       404: { description: Task not found }
 *       401: { description: Unauthorized }
 */
const update = async (req, res, next) => {
  try {
    const task = await updateTask(req.params.id, req.user.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Task ID
 *     responses:
 *       200: { description: Task deleted }
 *       404: { description: Task not found }
 *       401: { description: Unauthorized }
 */
const remove = async (req, res, next) => {
  try {
    const task = await deleteTask(req.params.id, req.user.id);
    res.status(200).json({ message: 'Task deleted', task });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/tasks/{id}/toggle:
 *   patch:
 *     summary: Toggle task completion status
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Task ID
 *     responses:
 *       200: { description: Updated task }
 *       404: { description: Task not found }
 *       401: { description: Unauthorized }
 */
const toggle = async (req, res, next) => {
  try {
    const task = await toggleTaskCompletion(req.params.id, req.user.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/tasks/due-soon:
 *   get:
 *     summary: Get tasks due within 24 hours
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of tasks due soon
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id: { type: string }
 *                   title: { type: string }
 *                   description: { type: string }
 *                   category: { type: string }
 *                   deadline: { type: string, format: date-time }
 *                   completed: { type: boolean }
 *                   user: { type: string }
 *                   createdAt: { type: string, format: date-time }
 *                   updatedAt: { type: string, format: date-time }
 *                   isDueSoon: { type: boolean }
 *                   hoursRemaining: { type: integer, description: Hours until deadline }
 *       401: { description: Unauthorized }
 */
const getDueSoon = async (req, res, next) => {
  try {
    const tasks = await getDueSoonTasks(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getById, update, remove, toggle, getDueSoon };