const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
} = require("../controllers/enrollment.controller");

const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, enrollCourse);
router.get("/me", protect, getMyEnrollments);
router.put("/:id/progress", protect, updateProgress);

module.exports = router;
