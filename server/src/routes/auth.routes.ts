import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { catchAsync } from '../middleware/error.middleware';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new admin (development only)
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin's username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Admin's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Admin's password
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/register', catchAsync(authController.register));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login as admin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Admin's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Admin's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', catchAsync(authController.login));

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get admin profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin profile retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/profile', authMiddleware, catchAsync(authController.getProfile));

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: Update admin profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin's new username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Admin's new email
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 description: Admin's current password (required for password change)
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: Admin's new password
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Admin not found
 */
router.put('/profile', authMiddleware, catchAsync(authController.updateProfile));

export default router; 