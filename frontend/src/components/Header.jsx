import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const role = localStorage.getItem("role");


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
          <Link to="/">E-Learn</Link>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-700 transition">
            Home
          </Link>
          <Link to="/courses" className="hover:text-blue-700 transition">
            Courses
          </Link>

          {loggedIn && (
            <Link to="/my-courses" className="hover:text-blue-700 transition">
              My Courses
            </Link>
          )}

          {role === "admin" && (
          <Link
            to="/admin"
            className="hover:text-yellow-400 font-semibold"
          >
            Admin Dashboard
          </Link>
          )}

          {!loggedIn && (
            <Link to="/login" className="hover:text-blue-700 transition">
              Login
            </Link>
          )}

          {loggedIn && (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
