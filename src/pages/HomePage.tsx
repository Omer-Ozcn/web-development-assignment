import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">Homepage</h1>
      <p className="mb-6 text-lg">Mini demo with JSONPlaceholder</p>
      <nav className="space-x-4">
        <Link className="text-blue-400 underline" to="/users">Go to Users</Link>
        <Link className="text-blue-400 underline" to="/posts">Go to Posts</Link>
      </nav>
    </div>
  );
}
