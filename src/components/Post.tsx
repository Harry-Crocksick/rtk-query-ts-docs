import { useParams } from "react-router-dom";
import { useGetEachTodoQuery } from "../features/api/todosApi";

export default function Post() {
  const { postId } = useParams();
  const {
    data: todo,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetEachTodoQuery(postId);

  let content;
  if (isLoading) {
    content = <h1 className="text-2xl font-semibold text-black">Loading...</h1>;
  } else if (isError) {
    content = (
      <p className="text-base font-medium text-red-500">
        {JSON.stringify(error)}
      </p>
    );
  } else if (isSuccess) {
    content = <div className="text-2xl font-semibold">{todo.title}</div>;
  }

  return <section className="px-4 py-2 flex-1">{content}</section>;
}
