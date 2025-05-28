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
exports.deleteRequirementRequest = exports.markAsReadAllRequests = exports.getAllRequirementRequests = exports.addRequirementRequest = void 0;
const index_1 = require("../index");
/**
 * @swagger
 * components:
 *   schemas:
 *     Requirement:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - contactNo
 *         - companyName
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the requirement
 *         isViewed:
 *           type: boolean
 *           description: Whether the requirement has been viewed
 *         name:
 *           type: string
 *           description: The name of the requester
 *         email:
 *           type: string
 *           description: The email of the requester
 *         contactNo:
 *           type: string
 *           description: The contact number of the requester
 *         whatsAppNo:
 *           type: string
 *           description: The WhatsApp number of the requester
 *         companyName:
 *           type: string
 *           description: The company name of the requester
 *         description:
 *           type: string
 *           description: The description of the requirement
 *         isNewProductRequest:
 *           type: boolean
 *           description: Whether it is a new product request
 *         productId:
 *           type: string
 *           description: The ID of the product
 *         productName:
 *           type: string
 *           description: The name of the product
 *       example:
 *         id: requirement123
 *         isViewed: false
 *         name: John Doe
 *         email: john.doe@example.com
 *         contactNo: 1234567890
 *         whatsAppNo: 0987654321
 *         companyName: Sample Company
 *         description: Sample requirement description
 *         isNewProductRequest: false
 *         productId: product123
 *         productName: Sample Product
 */
/**
 * @swagger
 * /requirements/add:
 *   post:
 *     summary: Add a new requirement request
 *     tags: [Requirements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Requirement'
 *     responses:
 *       201:
 *         description: The requirement request was successfully created
 *       500:
 *         description: Some server error
 */
const addRequirementRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contactNo, whatsAppNo, description, isNewProductRequest, productId, productName } = req.body;
    try {
        const newRequirement = yield index_1.prisma.requests.create({
            data: {
                name,
                email,
                contactNo,
                whatsAppNo,
                description,
                isNewProductRequest,
                productId,
                productName,
            },
        });
        return res.status(201).json({ message: 'Requirement request added successfully!', requirement: newRequirement });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add requirement request. Please try again.' });
    }
});
exports.addRequirementRequest = addRequirementRequest;
/**
 * @swagger
 * /requirements/all:
 *   get:
 *     summary: Get all requirement requests
 *     tags: [Requirements]
 *     responses:
 *       200:
 *         description: The list of the requirement requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Requirement'
 *       500:
 *         description: Some server error
 */
const getAllRequirementRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requirements = yield index_1.prisma.requests.findMany();
        return res.status(200).json(requirements);
    }
    catch (error) {
        console.error('Error fetching requirements:', error);
        return res.status(500).json({ message: 'Failed to fetch requirements. Please try again.' });
    }
});
exports.getAllRequirementRequests = getAllRequirementRequests;
/**
 * @swagger
 * /requirements/mark-as-read:
 *   put:
 *     summary: Mark all unread requirement requests as read
 *     tags: [Requirements]
 *     responses:
 *       200:
 *         description: All unread requirement requests were marked as read
 *       500:
 *         description: Some server error
 */
const markAsReadAllRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.prisma.requests.updateMany({
            where: { isViewed: false },
            data: { isViewed: true },
        });
        return res.status(200).json({ message: 'All unread requirement requests marked as read.' });
    }
    catch (error) {
        console.error('Error marking requests as read:', error);
        return res.status(500).json({ message: 'Failed to mark requests as read. Please try again.' });
    }
});
exports.markAsReadAllRequests = markAsReadAllRequests;
/**
 * @swagger
 * /requirements/delete:
 *   delete:
 *     summary: Delete a requirement request
 *     tags: [Requirements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the requirement request to delete
 *     responses:
 *       200:
 *         description: The requirement request was successfully deleted
 *       500:
 *         description: Some server error
 */
const deleteRequirementRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield index_1.prisma.requests.delete({
            where: { id },
        });
        return res.status(200).json({ message: 'Requirement request deleted successfully!' });
    }
    catch (error) {
        console.error('Error deleting requirement request:', error);
        return res.status(500).json({ message: 'Failed to delete requirement request. Please try again.' });
    }
});
exports.deleteRequirementRequest = deleteRequirementRequest;
