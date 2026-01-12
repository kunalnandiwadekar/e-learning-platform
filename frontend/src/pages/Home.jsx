import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Home() {
  const loggedIn = isLoggedIn();

  return (
    <div 
      className="min-h-screen flex flex-col text-gray-800 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/40 -z-10"></div>
      
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-blue-700">E-Learn Platform</span>
          </h1>
          <p className="text-lg text-gray-200 mb-10">
            Unlock your potential with our professional online learning platform
            built for modern learners and organizations.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/courses"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
            >
              Browse Courses
            </Link>

            {loggedIn ? (
              <Link
                to="/my-courses"
                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition"
              >
                My Courses
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white/90 backdrop-blur-sm text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-14 text-gray-900">
            Why Choose Us
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-lg transition">
              <div className="mb-4 text-blue-600 text-3xl">🎓</div>
              <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Learn from industry experts with proven experience and
                in-demand knowledge.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-lg transition">
              <div className="mb-4 text-blue-600 text-3xl">⏰</div>
              <h3 className="text-xl font-semibold mb-3">Flexible Learning</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Study anytime, anywhere, and access your courses on all devices
                at your own pace.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-lg transition">
              <div className="mb-4 text-blue-600 text-3xl">💼</div>
              <h3 className="text-xl font-semibold mb-3">Practical Skills</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Gain hands-on experience with real-world projects and practical
                assignments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white/80 backdrop-blur-sm py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of learners enhancing their skills and careers with
            E-Learn.
          </p>
          <Link
            to="/signup"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}
