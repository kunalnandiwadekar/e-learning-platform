const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    description: String,
    instructor: String,
    category: String,
    price: Number,

    thumbnail: {
      type: String,
      default: '/default-thumbnail.svg' // Default thumbnail path
    },

    published: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
