const { registerUser, loginUser } = require('../services/userService');
const { generateToken } = require('../utils/authUtils');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 6 }
 *               name: { type: string, maxLength: 50 }
 *     responses:
 *       201: { description: User registered successfully }
 *       400: { description: Invalid input or email already in use }
 */
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new CustomError('All fields are required', 400);
    }
    const user = await registerUser({ email, password, name });
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful }
 *       401: { description: Invalid credentials }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError('Email and password are required', 400);
    }
    const user = await loginUser({ email, password });
    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };