import { useEffect, useState } from "react";
import { User } from "../../types";

type Props = {
  initial: Partial<User>;
  mode: "create" | "edit";
  onSubmit: (data: Omit<User, "id"> | Partial<User>) => void;
  onCancel: () => void;
};

export default function UserForm({ initial, mode, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial.name ?? "");
  const [username, setUsername] = useState(initial.username ?? "");
  const [email, setEmail] = useState(initial.email ?? "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setName(initial.name ?? "");
    setUsername(initial.username ?? "");
    setEmail(initial.email ?? "");
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const u = username.trim();
    const m = email.trim();
    if (!n || !u || !m) return;

    setSubmitting(true);
    if (mode === "create") {
      const payload: Omit<User, "id"> = { name: n, username: u, email: m };
      onSubmit(payload);
    } else {
      const payload: Partial<User> = { name: n, username: u, email: m };
      onSubmit(payload);
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="my-3 grid gap-2 md:gap-3">
      <div className="flex flex-wrap gap-2">
        <label className="flex-1 min-w-[220px] flex flex-col gap-1">
          <span className="text-sm text-gray-500">Name *</span>
          <input
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2"
            required
          />
        </label>

        <label className="flex-1 min-w-[220px] flex flex-col gap-1">
          <span className="text-sm text-gray-500">Username *</span>
          <input
            placeholder="janedoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2"
            required
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-500">Email *</span>
        <input
          type="email"
          placeholder="jane@doe.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
          required
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
          {mode === "edit" ? "Save Changes" : "Create User"}
        </button>
      </div>
    </form>
  );
}
