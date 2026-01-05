import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          <Link to="/">E-Learn</Link>
        </h1>

        <nav className="space-x-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/courses" className="hover:text-blue-400">Courses</Link>

          {loggedIn && (
            <Link to="/my-courses" className="hover:text-blue-400">
              My Courses
            </Link>
          )}

          {!loggedIn && (
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
          )}

          {loggedIn && (
            <button
              onClick={handleLogout}
              className="ml-4 text-red-400 hover:text-red-500"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
