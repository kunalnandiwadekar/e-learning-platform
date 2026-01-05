import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Available Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow p-6"
          >
            <h3 className="text-xl font-medium mb-2">
              {course.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {course.description}
            </p>

            <Link
              to={`/courses/${course.slug}`}
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              View Course →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
