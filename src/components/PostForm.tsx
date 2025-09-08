import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Post } from "../types";

export default function PostForm() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get<Post[]>("/posts").then((res) => {
      setPosts(res.data.slice(0, 5)); 
    });
  }, []);

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>#{p.id} - {p.title}</li>
      ))}
    </ul>
  );
}
