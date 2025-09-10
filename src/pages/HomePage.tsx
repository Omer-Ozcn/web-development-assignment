import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="p-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Homepage</h1>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-1">Users</h3>
            <p className="text-gray-600 mb-3">id, name, username, email</p>
            <Link to="/users" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">
              Go to Users
            </Link>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-1">Posts</h3>
            <p className="text-gray-600 mb-3">userId, id, title</p>
            <Link to="/posts" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">
              Go to Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
