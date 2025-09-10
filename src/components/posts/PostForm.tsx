import { useState } from "react";
import { Post, User } from "../../types";

type Props = {
  initial: Partial<Post>;
  users: User[];
  onSubmit: (data: Omit<Post, "id"> | Partial<Post>) => void;
  onCancel: () => void;
  mode: "create" | "edit";
};

export default function PostForm({ initial, users, onSubmit, onCancel, mode }: Props) {
  const [userId, setUserId] = useState<number>(Number(initial.userId ?? users[0]?.id ?? 1));
  const [title, setTitle] = useState(initial.title ?? "");
  const [body, setBody] = useState(initial.body ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body?.trim() || undefined;
    if (!trimmedTitle) return;

    // mode'a göre doğru tipte payload oluştur
    if (mode === "create") {
      const payload: Omit<Post, "id"> = { userId, title: trimmedTitle, body: trimmedBody };
      onSubmit(payload);
    } else {
      const payload: Partial<Post> = { userId, title: trimmedTitle, body: trimmedBody };
      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={submit} className="my-3 grid gap-2">
      <div className="flex flex-wrap gap-2">
        <label className="flex items-center gap-2">
          <span className="text-sm text-gray-500">User</span>
          <select
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="border rounded p-2"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                #{u.id} {u.name}
              </option>
            ))}
          </select>
        </label>

        <input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 flex-1 min-w-[260px]"
          required
        />
      </div>

      <textarea
        placeholder="Post body (optional)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border rounded p-2 min-h-[90px]"
      />

      <div className="flex gap-2 justify-end">
        {mode === "edit" && (
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-400 text-white">
            Cancel
          </button>
        )}
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
          {mode === "edit" ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
