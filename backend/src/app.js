const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes");
const healthRoutes = require("./routes/health.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/admin", adminRoutes);
// Serve static files from uploads and public directories
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("E-Learning Platform Backend is running 🚀");
});

module.exports = app;
