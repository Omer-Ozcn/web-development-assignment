import UserForm from "../components/UserForm";

export default function Users() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-3xl font-semibold mb-4">Users Page</h2>
      <UserForm />
    </div>
  );
}
