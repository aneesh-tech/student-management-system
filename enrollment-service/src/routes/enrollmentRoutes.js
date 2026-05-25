const express = require('express');
const { getEnrollments, enrollStudent, dropEnrollment } = require('../controllers/enrollmentController');
const router = express.Router();

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: List of enrollments
 */
router.get('/', getEnrollments);

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Enroll student in a course
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enrollmentId: { type: string }
 *               studentId: { type: string }
 *               courseId: { type: string }
 */
router.post('/', enrollStudent);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Drop an enrollment
 *     tags: [Enrollments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/:id', dropEnrollment);

module.exports = router;
