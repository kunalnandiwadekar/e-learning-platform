import { Link } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

export default function Home() {
  const loggedIn = isLoggedIn();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to E-Learn Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock your potential with our comprehensive online courses.
          </p>
          <div className="space-x-4">
            <Link
              to="/courses"
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Browse Courses
            </Link>
            {loggedIn ? (
              <Link
                to="/my-courses"
                className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded hover:bg-gray-50"
              >
                My Courses
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded hover:bg-gray-50"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of experience.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">
                Study at your own pace, anytime, anywhere.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Practical Skills</h3>
              <p className="text-gray-600">
                Gain hands-on experience with real-world projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of students already learning with us.
          </p>
          <Link
            to="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}