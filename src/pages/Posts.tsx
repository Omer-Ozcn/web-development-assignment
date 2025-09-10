import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { Post, User } from "../types";
import PostForm from "../components/posts/PostForm";
import PostTable from "../components/posts/PostTable";
import Toast from "../components/ui/Toast";
import Spinner from "../components/ui/Spinner";

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
    return () => { alive = false; };
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
    if (!window.confirm("Delete this post?")) return;
    await api.delete(`/posts/${id}`);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setToast({ kind: "success", msg: "Post deleted" });
  };

  return (
    <div className="p-4 min-h-screen">
      {toast && <Toast kind={toast.kind} message={toast.msg} onClose={() => setToast(null)} />}

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
              <option key={u.id} value={u.id}>#{u.id} - {u.name}</option>
            ))}
          </select>
        </div>

        <PostForm
          key={editing?.id ?? "create"}
          users={users}
          initial={(editing ?? { userId: users[0]?.id ?? 1, title: "", body: "" }) as Partial<Post>}
          onSubmit={(data) => (editing
            ? handleUpdate(editing.id, data as Partial<Post>)
            : handleCreate(data as Omit<Post, "id">)
          )}
          mode={editing ? "edit" : "create"}
          onCancel={() => setEditing(null)}
        />

        <hr className="my-4" />

        {loading ? (
          <div className="flex items-center gap-3 text-gray-600"><Spinner /> Loading...</div>
        ) : (
          <PostTable posts={filtered} users={users} onEdit={setEditing} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
