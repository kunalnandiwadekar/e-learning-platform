export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center">
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} E-Learning Platform. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          Empowering professionals through modern online learning.
        </p>
      </div>
    </footer>
  );
}
