const Enrollment = require("../models/enrollment.model");

exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error("Enroll error:", error.message);
    res.status(500).json({ message: "Enrollment failed" });
  }
};

exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user._id,
    }).populate("course");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { lessonId, completed } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.progress.set(lessonId, completed);
    await enrollment.save();

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Progress update failed" });
  }
};
