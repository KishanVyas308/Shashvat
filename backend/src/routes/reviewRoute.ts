import { Router } from 'express';
import { addReview, getAllReviews, deleteReview } from '../controller/reviewController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: The reviews managing API
 */

/**
 * @swagger
 * /reviews/add:
 *   post:
 *     summary: Add a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The review was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/add', addReview);

/**
 * @swagger
 * /reviews/all:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: The list of the reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Some server error
 */
router.get('/all', getAllReviews);

/**
 * @swagger
 * /reviews/delete:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: string
 *                 description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: The review was successfully deleted
 *       500:
 *         description: Some server error
 */
router.delete('/delete', deleteReview);

export default router;
