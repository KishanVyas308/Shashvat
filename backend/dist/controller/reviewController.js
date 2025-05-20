"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.getAllReviews = exports.addReview = void 0;
const index_1 = require("../index");
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - companyName
 *         - description
 *         - name
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the review
 *         companyName:
 *           type: string
 *           description: The company name of the reviewer
 *         description:
 *           type: string
 *           description: The description of the review
 *         name:
 *           type: string
 *           description: The name of the reviewer
 *         img:
 *           type: string
 *           description: The image URL of the reviewer
 *         rating:
 *           type: integer
 *           description: The rating given by the reviewer
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the review was created
 *         productId:
 *           type: string
 *           description: The ID of the product being reviewed
 *       example:
 *         id: review123
 *         companyName: Sample Company
 *         description: Great product!
 *         name: John Doe
 *         img: http://example.com/reviewer.jpg
 *         rating: 5
 *         createdAt: 2021-01-01T00:00:00.000Z
 *         productId: product123
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
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, description, name, img, rating, productId } = req.body;
    try {
        const newReview = yield index_1.prisma.review.create({
            data: {
                companyName,
                description,
                name,
                img,
                rating,
            },
        });
        return res.status(201).json({ message: 'Review added successfully!', review: newReview });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add review. Please try again.' });
    }
});
exports.addReview = addReview;
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
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield index_1.prisma.review.findMany();
        return res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ message: 'Failed to fetch reviews. Please try again.' });
    }
});
exports.getAllReviews = getAllReviews;
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
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.body;
    try {
        yield index_1.prisma.review.delete({
            where: { id: reviewId },
        });
        return res.status(200).json({ message: 'Review deleted successfully!' });
    }
    catch (error) {
        console.error('Error deleting review:', error);
        return res.status(500).json({ message: 'Failed to delete review. Please try again.' });
    }
});
exports.deleteReview = deleteReview;
