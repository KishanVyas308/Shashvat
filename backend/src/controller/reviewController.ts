import { prisma } from '../index';

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
export const addReview = async (req: any, res: any) => {
  const { companyName, description, name, img, rating, productId } = req.body;

  try {
    const newReview = await prisma.review.create({
      data: {
        companyName,
        description,
        name,
        img,
        rating,
      },
    });

    return res.status(201).json({ message: 'Review added successfully!', review: newReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to add review. Please try again.' });
  }
};

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
export const getAllReviews = async (req: any, res: any) => {
  try {
    const reviews = await prisma.review.findMany();

    return res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ message: 'Failed to fetch reviews. Please try again.' });
  }
};

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
export const deleteReview = async (req: any, res: any) => {
  const { reviewId } = req.body;

  try {
    await prisma.review.delete({
      where: { id: reviewId },
    });

    return res.status(200).json({ message: 'Review deleted successfully!' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ message: 'Failed to delete review. Please try again.' });
  }
};
