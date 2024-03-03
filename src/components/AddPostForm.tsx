import { useState } from "react";
import { useAddTodoMutation } from "../features/api/todosApi";

let nextId = 11;

export default function AddPostForm() {
  const [input, setInput] = useState("");
  const [addTodo, { isLoading }] = useAddTodoMutation();

  function handleAddTodo() {
    addTodo({ id: nextId++ + "", title: input, completed: false });
    setInput("");
  }

  return (
    <fieldset className="p-4 pb-6 flex gap-x-14 lg:gap-x-32 justify-between align-bottom border-b border-slate-200">
      <div className="flex-1">
        <label htmlFor="edit" className="block">
          Post name
        </label>
        <input
          type="text"
          name="post-name"
          id="edit"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border-slate-300/75 rounded-md"
        />
      </div>
      <button
        type="button"
        className="max-w-max font-medium text-xl text-white px-2 mt-6 bg-purple-700 hover:bg-purple-800 rounded-lg"
        onClick={handleAddTodo}
      >
        {isLoading ? "Loading" : "Add Post"}
      </button>
    </fieldset>
  );
}
