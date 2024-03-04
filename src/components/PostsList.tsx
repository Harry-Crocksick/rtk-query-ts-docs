import { MdBook } from "react-icons/md";
import { useGetTodosQuery } from "../features/api/todosApi";
import { Link } from "react-router-dom";

export default function PostsList() {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  let content;
  if (isError) {
    content = (
      <p className="text-semibold text-base text-red-500">
        {JSON.stringify(error)}
      </p>
    );
  } else if (isLoading) {
    content = <p className="font-semibold text-2xl">Loading...</p>;
  } else if (isSuccess) {
    content = (
      <ul className="p-4 flex flex-col space-y-4">
        {todos.map((todo) => (
          <li key={todo.id} className="inline-flex items-center space-x-2">
            <MdBook className="text-green-400" />
            <Link
              to={`/post/${todo.id}`}
              className="font-semibold text-black text-md"
            >
              {todo.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="basis-1/3 flex flex-col divide-y border-r">
      <h2 className="font-medium text-lg px-4 py-2">Posts</h2>
      {content}
    </section>
  );
}
