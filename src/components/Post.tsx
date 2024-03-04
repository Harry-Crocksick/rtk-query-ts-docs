import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetEachTodoQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../features/api/todosApi";
import { GrFormClose } from "react-icons/gr";
import { EditParamsTypes } from "../lib/types";

export default function Post() {
  const { postId } = useParams();
  const {
    data: todo,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetEachTodoQuery(postId);
  const [deleteTodo, { isLoading: isDeleteLoading }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdateLoading }] = useUpdateTodoMutation();

  let content;
  if (isError) {
    content = (
      <p className="text-base font-medium text-red-500">
        {JSON.stringify(error)}
      </p>
    );
  } else if (isSuccess) {
    content = (
      <EditableTodo
        todo={todo}
        onUpdateTodo={updateTodo}
        onDeleteTodo={deleteTodo}
        isUpdateLoading={isUpdateLoading}
        isDeleteLoading={isDeleteLoading}
      />
    );
  } else if (isLoading) {
    content = <p className="text-xl font-semibold">Loading...</p>;
  }

  return (
    <section className="px-4 py-2 flex-1">
      <div className="flex justify-between items-center gap-x-8">{content}</div>
      <div className="mt-8">
        <pre className="bg-slate-100 p-2">{JSON.stringify(todo, null, 2)}</pre>
      </div>
    </section>
  );
}

function EditableTodo({
  todo,
  onUpdateTodo,
  onDeleteTodo,
  isUpdateLoading = false,
  isDeleteLoading = false,
}: EditParamsTypes) {
  const [input, setInput] = useState(todo.title);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  function handleUpdateTodo() {
    onUpdateTodo({ id: todo.id, title: input });
    setIsEditMode(false);
  }

  return (
    <>
      {isEditMode ? (
        <input
          type="text"
          value={input}
          className="flex-1 border-slate-300 rounded-md"
          onChange={(e) => setInput(e.target.value)}
        />
      ) : (
        <h1>{todo.title}</h1>
      )}
      <div className="flex items-center space-x-4">
        {isEditMode ? (
          <button
            className="max-w-max px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 text-black font-semibold rounded-md"
            onClick={handleUpdateTodo}
          >
            {isUpdateLoading ? "Updating" : "Update"}
          </button>
        ) : (
          <button
            className="max-w-max px-4 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-100 text-black font-semibold rounded-md"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            Edit
          </button>
        )}
        {isEditMode ? (
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="max-w-max px-4 py-1 active:bg-slate-100 text-black font-semibold rounded-md"
          >
            <GrFormClose className="text-2xl" />
          </button>
        ) : (
          <button
            onClick={() => {
              onDeleteTodo(todo.id);
              navigate("/");
            }}
            className="max-w-max px-2 py-1 bg-red-500 rounded-md text-white font-semibold"
          >
            {isDeleteLoading ? "Loading" : "Delete"}
          </button>
        )}
      </div>
    </>
  );
}

/* function Button() {
  return null;
} */
