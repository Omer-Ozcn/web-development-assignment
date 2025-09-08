export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body?: string;
};
