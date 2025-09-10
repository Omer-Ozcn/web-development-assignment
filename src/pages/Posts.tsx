import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { Post, User } from "../types";
import PostForm from "../components/PostForm";
import Toast from "../components/Toast";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filterUserId, setFilterUserId] = useState<number | "all">("all");
  const [editing, setEditing] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ kind: "success" | "error" | "info"; msg: string } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const [p, u] = await Promise.all([api.get<Post[]>("/posts"), api.get<User[]>("/users")]);
        if (!alive) return;
        setPosts(p.data);
        setUsers(u.data);
      } catch {
        setToast({ kind: "error", msg: "Data fetch failed" });
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const list = filterUserId === "all" ? posts : posts.filter((p) => p.userId === filterUserId);
    return [...list].sort((a, b) => a.id - b.id);
  }, [posts, filterUserId]);

  const handleCreate = async (payload: Omit<Post, "id">) => {
    const res = await api.post<Post>("/posts", payload);
    const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    setPosts((prev) => [...prev, { ...res.data, id: nextId }]);
    setToast({ kind: "success", msg: "Post created" });
  };

  const handleUpdate = async (id: number, payload: Partial<Post>) => {
    await api.put(`/posts/${id}`, payload);
    setPosts((prev) => prev.map((p) => (p.id === id ? ({ ...p, ...payload } as Post) : p)));
    setEditing(null);
    setToast({ kind: "success", msg: "Post updated" });
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;
    await api.delete(`/posts/${id}`);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setToast({ kind: "success", msg: "Post deleted" });
  };

  const getUserName = (userId: number) => users.find((u) => u.id === userId)?.name ?? `User ${userId}`;

  return (
    <div className="p-4 min-h-screen">
      {toast && <Toast kind={toast.kind as any} message={toast.msg} onClose={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Posts</h2>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <label className="text-sm">Filter by User:</label>
          <select
            value={filterUserId === "all" ? "all" : String(filterUserId)}
            onChange={(e) => setFilterUserId(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="border rounded p-2"
          >
            <option value="all">All</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                #{u.id} - {u.name}
              </option>
            ))}
          </select>
        </div>

        <PostForm
          key={editing?.id ?? "create"}
          users={users}
          initial={editing ?? ({ userId: users[0]?.id ?? 1, title: "", body: "" } as any)}
          onSubmit={(data) => (editing ? handleUpdate(editing.id, data) : handleCreate(data as Omit<Post, "id">))}
          mode={editing ? "edit" : "create"}
          onCancel={() => setEditing(null)}
        />

        <hr className="my-4" />

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-gray-600 border rounded p-4">No posts</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 border">ID</th>
                  <th className="text-left p-2 border">Title</th>
                  <th className="text-left p-2 border">User</th>
                  <th className="text-left p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2 border font-medium">#{p.id}</td>
                    <td className="p-2 border">{p.title}</td>
                    <td className="p-2 border">{getUserName(p.userId)}</td>
                    <td className="p-2 border">
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 bg-yellow-500 text-white rounded"
                          onClick={() => setEditing(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 bg-red-600 text-white rounded"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
 