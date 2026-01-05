import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

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
  );
}
