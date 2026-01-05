import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    api
      .get("/enrollments/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEnrollments(res.data))
      .catch(() => alert("Failed to load enrolled courses"));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">My Courses</h2>

      {enrollments.length === 0 && (
        <p className="text-gray-600">You have not enrolled in any courses yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrollments.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-xl font-medium mb-2">
              {item.course.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {item.course.description}
            </p>

            <Link
              to={`/courses/${item.course.slug}`}
              className="text-blue-600 font-medium hover:underline"
            >
              Go to Course →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
