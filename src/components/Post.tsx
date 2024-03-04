import { useParams, useNavigate } from "react-router-dom";
import {
  useGetEachTodoQuery,
  useDeleteTodoMutation,
} from "../features/api/todosApi";

export default function Post() {
  const { postId } = useParams();
  const {
    data: todo,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetEachTodoQuery(postId);
  const [deleteTodo, { isLoading: isErrorLoading }] = useDeleteTodoMutation();
  const navigate = useNavigate();

  function handleDeleteTodo() {
    deleteTodo(postId!);
    navigate("/");
  }

  let content;
  if (isLoading) {
    content = <p className="text-2xl font-semibold text-black">Loading...</p>;
  } else if (isError) {
    content = (
      <p className="text-base font-medium text-red-500">
        {JSON.stringify(error)}
      </p>
    );
  } else if (isSuccess) {
    content = <div className="text-2xl font-semibold">{todo.title}</div>;
  }

  return (
    <section className="px-4 py-2 flex-1">
      <h1>{content}</h1>
      <button
        onClick={handleDeleteTodo}
        className="max-w-max px-2 py-1 bg-red-500 rounded-md text-white font-semibold"
      >
        {isErrorLoading ? "Loading" : "Delete"}
      </button>
    </section>
  );
}
