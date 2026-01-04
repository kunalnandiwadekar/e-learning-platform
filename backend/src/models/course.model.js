const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  order: Number,
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    price: Number,
    category: String,
    difficulty: String,
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
