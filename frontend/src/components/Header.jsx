import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">E-Learn</h1>

        <nav className="space-x-6">
          <Link className="hover:text-blue-400" to="/">Home</Link>
          <Link className="hover:text-blue-400" to="/courses">Courses</Link>
          <Link className="hover:text-blue-400" to="/login">Login</Link>
          <Link className="hover:text-blue-400" to="/my-courses">My Courses</Link>
        </nav>
      </div>
    </header>
  );
}
