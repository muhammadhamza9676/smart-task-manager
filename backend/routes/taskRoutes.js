const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { create, getAll, getById, update, remove, toggle, getDueSoon } = require('../controllers/taskController');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.use(authMiddleware); // Apply auth middleware to all task routes

router.post('/', create);
router.get('/', getAll);
router.get('/due-soon', getDueSoon); 
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);
router.patch('/:id/toggle', toggle);

module.exports = router;