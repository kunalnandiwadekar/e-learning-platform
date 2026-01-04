const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const { protect } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

router.get("/", getCourses);
router.get("/:slug", getCourseBySlug);

router.post("/", protect, isAdmin, createCourse);
router.put("/:id", protect, isAdmin, updateCourse);
router.delete("/:id", protect, isAdmin, deleteCourse);

module.exports = router;



