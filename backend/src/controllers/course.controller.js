const Course = require("../models/course.model");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

exports.getCourseBySlug = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
};

exports.updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(course);
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
};


