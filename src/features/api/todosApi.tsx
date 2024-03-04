import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoTypes } from "../../lib/types";

export const todosApi = createApi({
  reducerPath: "/",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoTypes[], void>({
      query: () => "/todos",
      transformResponse: (res: TodoTypes[]) =>
        res.sort((a, b) => Number(b.id) - Number(a.id)),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todos", id } as const)),
              { type: "Todos", id: "TODO-LIST" },
            ]
          : [{ type: "Todos", id: "TODO-LIST" }],
    }),
    getEachTodo: builder.query<TodoTypes, string | void>({
      query: (id) => `/todos/${id}`,
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<TodoTypes, Partial<TodoTypes>>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: [{ type: "Todos", id: "TODO-LIST" }],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Todos", id },
        { type: "Todos", id: "TODO-LIST" },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetEachTodoQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
