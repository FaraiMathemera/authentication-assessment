import { Router } from "express";
import { register, login } from "../controllers/users.controller";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                  type: string
 *                  description: User
 *               surname:
 *                  type: string
 *                  description: User surname
 *               email:
 *                  type: string
 *                  description: User email
 *               password:
 *                  type: string
 *                  description: User password
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Errors occurred during registration
 */
router.post("/register", register);
/**
 * @swagger
 * /api/auth/:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                  type: string
 *                  description: Email address
 *               password:
 *                  type: string
 *                  description: Password
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Errors occurred during login
 */
router.post("/", login);

export default router;
