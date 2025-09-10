import { User } from "../../types";

type Props = {
  users: User[];
  onEdit: (u: User) => void;
  onDelete: (id: number) => void;
};

export default function UserTable({ users, onEdit, onDelete }: Props) {
  if (users.length === 0) {
    return <div className="text-gray-600 border rounded p-4">No users</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[720px] w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border">ID</th>
            <th className="text-left p-2 border">Name</th>
            <th className="text-left p-2 border">Username</th>
            <th className="text-left p-2 border">Email</th>
            <th className="text-left p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="odd:bg-white even:bg-gray-50">
              <td className="p-2 border font-medium">#{u.id}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.username}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button onClick={() => onEdit(u)} className="px-2 py-1 bg-yellow-500 text-white rounded">
                    Edit
                  </button>
                  <button onClick={() => onDelete(u.id)} className="px-2 py-1 bg-red-600 text-white rounded">
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
