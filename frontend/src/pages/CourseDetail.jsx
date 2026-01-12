import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

// Map course titles to specific, relevant images
const getCourseThumbnail = (title) => {
  const courseImages = {
    'react basics': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg',
    'full stack web dev': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fullstack/fullstack-original.svg',
    'python programming': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg',
    'data science': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg',
    'artificial intelligence': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original-wordmark.svg',
    'machine learning': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original-wordmark.svg'
  };

  const lowerTitle = title.toLowerCase();

  // Check for exact or partial matches
  for (const [key, image] of Object.entries(courseImages)) {
    if (lowerTitle.includes(key)) {
      return image;
    }
  }

  // Fallback to technology-specific icons if no exact match
  const techIcons = {
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg',
    'data': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original-wordmark.svg',
    'ai': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original-wordmark.svg',
    'ml': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original-wordmark.svg',
    'web': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg'
  };

  for (const [tech, icon] of Object.entries(techIcons)) {
    if (lowerTitle.includes(tech)) {
      return icon;
    }
  }

  // Default to a general code icon
  return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain-wordmark.svg';
};

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/courses/${slug}`).then((res) => setCourse(res.data));
  }, [slug]);

  if (!course) return <p>Loading...</p>;

  const handleEnroll = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    await api.post(
      "/enrollments",
      { courseId: course._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Enrolled successfully");
  } catch (err) {
    alert("Enrollment failed or already enrolled");
  }
};

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 rounded-lg p-8 flex justify-center items-center">
        <img
          src={course.thumbnail || getCourseThumbnail(course.title)}
          alt={course.title}
          className="h-48 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain-wordmark.svg';
          }}
        />
      </div>
      <h2 className="text-3xl font-semibold mb-3">
        {course.title}
      </h2>
      <div className="bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-semibold mb-3">
        {course.title}
      </h2>

      <p className="text-gray-700 mb-6">
        {course.description}
      </p>

      <h4 className="text-lg font-medium mb-3">Lessons</h4>

      <ul className="space-y-2">
        {course.lessons.map((lesson) => (
          <li
            key={lesson.order}
            className="border rounded px-4 py-2"
          >
            {lesson.title}
          </li>
        ))}
      </ul>
      <button
        onClick={handleEnroll}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Enroll Now
      </button>

      </div>
    </div>
  );
}
