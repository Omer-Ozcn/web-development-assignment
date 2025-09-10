import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { User } from "../types";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";
import Toast from "../components/ui/Toast";
import Spinner from "../components/ui/Spinner";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ kind: "success" | "error" | "info"; msg: string } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await api.get<User[]>("/users");
        if (!alive) return;
        setUsers(res.data);
      } catch {
        setToast({ kind: "error", msg: "Data fetch failed" });
      } finally {
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const sorted = useMemo(() => [...users].sort((a, b) => a.id - b.id), [users]);

  const handleCreate = async (payload: Omit<User, "id">) => {
    const res = await api.post<User>("/users", payload);
    const newUser = { ...res.data, id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1 };
    setUsers((prev) => [...prev, newUser]);
    setToast({ kind: "success", msg: "User created" });
  };

  const handleUpdate = async (id: number, payload: Partial<User>) => {
    await api.put(`/users/${id}`, payload);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...payload } : u)));
    setEditing(null);
    setToast({ kind: "success", msg: "User updated" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/users/${id}`);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setToast({ kind: "success", msg: "User deleted" });
  };

  return (
    <div className="p-4 min-h-screen">
      {toast && <Toast kind={toast.kind} message={toast.msg} onClose={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Users</h2>

        <UserForm
          initial={editing ?? { name: "", username: "", email: "" }}
          mode={editing ? "edit" : "create"}
          onSubmit={(data) => (editing
            ? handleUpdate(editing.id, data as Partial<User>)
            : handleCreate(data as Omit<User, "id">)
          )}
          onCancel={() => setEditing(null)}
        />

        <hr className="my-4" />

        {loading ? (
          <div className="flex items-center gap-3 text-gray-600"><Spinner /> Loading...</div>
        ) : (
          <UserTable users={sorted} onEdit={setEditing} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
