import { useEffect, useState } from "react";
import api from "../api/axios";
import type { User } from "../types";

export default function UserForm() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>("/users").then((res) => {
      setUsers(res.data.slice(0, 5)); 
    });
  }, []);

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>#{u.id} - {u.name}</li>
      ))}
    </ul>
  );
}
