import PostForm from "../components/PostForm";

export default function Posts() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-3xl font-semibold mb-4">Posts Page</h2>
      <PostForm />
    </div>
  );
}
