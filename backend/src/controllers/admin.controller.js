const User = require('../models/user.model');
const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');
const slugify = require("slugify");

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalEnrollments] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Enrollment.countDocuments()
    ]);

    const recentEnrollments = await Enrollment.find()
      .populate('user', 'name email')
      .populate('course', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments,
      recentEnrollments
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

// User Management
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-passwordHash');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

//User Role Updation
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role' });
  }
};

// User deletion
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Course Management
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().select(
      "title instructor createdAt"
    );

    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

//create course
exports.createCourse = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.body || !req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const slug = slugify(req.body.title, {
      lower: true,
      strict: true,
    });

    const course = new Course({
      title: req.body.title,
      slug,
      description: req.body.description,
      instructor: req.body.instructor,
      category: req.body.category,
      price: req.body.price,
      published: req.body.published || false,
      thumbnail: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error("Create course error:", error);
    res.status(400).json({ message: error.message });
  }
};


//update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error updating course', error: error.message });
  }
};

//delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Delete associated enrollments
    await Enrollment.deleteMany({ course: req.params.id });
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course' });
  }
};

// Enrollment Management
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('user', 'name email')
      .populate('course', 'title');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollments' });
  }
};

exports.getEnrollmentsByCourse = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId })
      .populate('user', 'name email')
      .populate('course', 'title');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollments' });
  }
};

exports.cancelEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    
    res.json({ message: 'Enrollment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling enrollment' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error loading course" });
  }
};
