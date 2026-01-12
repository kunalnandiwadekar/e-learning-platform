const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware');
const upload = require("../middleware/upload.middleware");

// Admin dashboard stats
router.get('/stats', protect, isAdmin, adminController.getDashboardStats);

// User management
router.get('/users', protect, isAdmin, adminController.getAllUsers);
router.put('/users/:id/role', protect, isAdmin, adminController.updateUserRole);
router.delete('/users/:id', protect, isAdmin, adminController.deleteUser);
router.get(
  "/courses/:id",
  protect,
  isAdmin,
  adminController.getCourseById
);

// Course management
router.get('/courses', protect, isAdmin, adminController.getAllCourses);
router.post(
  "/courses",
  protect,
  isAdmin,
  upload.single("thumbnail"),
  adminController.createCourse
);
router.put('/courses/:id', protect, isAdmin, upload.single("thumbnail"), adminController.updateCourse);
router.delete('/courses/:id', protect, isAdmin, adminController.deleteCourse);

// Enrollment management
router.get('/enrollments', protect, isAdmin, adminController.getAllEnrollments);
router.get('/enrollments/course/:courseId', protect, isAdmin, adminController.getEnrollmentsByCourse);
router.delete('/enrollments/:id', protect, isAdmin, adminController.cancelEnrollment);

module.exports = router;
