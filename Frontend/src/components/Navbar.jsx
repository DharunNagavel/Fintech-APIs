import {Link} from "react-router-dom";
export const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">AI Compliance Layer</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Dasboard
          </Link>
          <Link
            to="/payment"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Payment
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};
