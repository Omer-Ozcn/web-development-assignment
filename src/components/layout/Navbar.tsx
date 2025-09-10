import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const base = "px-3 py-2 rounded";
  const active = "bg-blue-600 text-white";
  const idle = "text-blue-700 hover:bg-blue-50";

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4 translate-x-[100px]">
        <Link to="/" className="font-semibold text-lg">Homepage</Link>
        <nav className="flex gap-2">
          <NavLink
            to="/users"
            className={({ isActive }) => `${base} ${isActive ? active : idle}`}
          >
            Users
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) => `${base} ${isActive ? active : idle}`}
          >
            Posts
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
