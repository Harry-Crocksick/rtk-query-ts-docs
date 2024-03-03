import { useGetTodosQuery } from "../features/api/todosApi";

export default function Navigation() {
  const { data: todos } = useGetTodosQuery();

  return (
    <nav className="w-full bg-slate-900 flex justify-between p-4">
      <h1 className="font-bold text-4xl text-white">Manage Posts</h1>
      <div className="text-white font-medium text-center">
        <p>Active posts</p>
        <p className="font-semibold text-white text-2xl">{todos?.length}</p>
      </div>
    </nav>
  );
}
