"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requirementController_1 = require("../controller/requirementController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Requirements
 *   description: The requirements managing API
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
router.post('/add', requirementController_1.addRequirementRequest);
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
router.get('/all', requirementController_1.getAllRequirementRequests);
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
router.put('/mark-as-read', requirementController_1.markAsReadAllRequests);
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
router.delete('/delete', requirementController_1.deleteRequirementRequest);
exports.default = router;
