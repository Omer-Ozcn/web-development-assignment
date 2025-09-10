import { useEffect, useState } from "react";
import { Post, User } from "../types";

type Props = {
  initial: Partial<Post>;
  users: User[];
  mode: "create" | "edit";
  onSubmit: (data: Omit<Post, "id"> | Partial<Post>) => void;
  onCancel: () => void;
};

export default function PostForm({ initial, users, mode, onSubmit, onCancel }: Props) {
  const [userId, setUserId] = useState<number>(initial.userId ?? users[0]?.id ?? 1);
  const [title, setTitle] = useState(initial.title ?? "");
  const [body, setBody] = useState(initial.body ?? "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUserId(initial.userId ?? users[0]?.id ?? 1);
    setTitle(initial.title ?? "");
    setBody(initial.body ?? "");
  }, [initial, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    onSubmit({ userId, title: title.trim(), body: body.trim() } as any);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="my-3 grid gap-2 md:gap-3">
      <div className="flex flex-wrap gap-2">
        <label className="flex flex-col gap-1 min-w-[220px]">
          <span className="text-sm text-gray-500">User</span>
          <select
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="border rounded p-2 min-w-[220px]"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                #{u.id} {u.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex-1 min-w-[220px] flex flex-col gap-1">
          <span className="text-sm text-gray-500">Title *</span>
          <input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
            required
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-500">Body</span>
        <textarea
          placeholder="Optional content..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border rounded p-2"
          rows={3}
        />
      </label>

      <div className="flex gap-2 justify-end">
        {mode === "edit" && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-60"
        >
          {mode === "edit" ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
