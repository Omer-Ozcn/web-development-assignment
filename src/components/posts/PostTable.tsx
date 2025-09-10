import { Post, User } from "../../types";

type Props = {
  posts: Post[];
  users: User[];
  onEdit: (p: Post) => void;
  onDelete: (id: number) => void;
};

export default function PostTable({ posts, users, onEdit, onDelete }: Props) {
  const getUserName = (userId: number) => users.find((u) => u.id === userId)?.name ?? `User ${userId}`;

  if (posts.length === 0) {
    return <div className="text-gray-600 border rounded p-4">No posts</div>;
  }

  return (
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
          {posts.map((p) => (
            <tr key={p.id} className="odd:bg-white even:bg-gray-50">
              <td className="p-2 border font-medium">#{p.id}</td>
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border">{getUserName(p.userId)}</td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => onEdit(p)}>
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => onDelete(p.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
