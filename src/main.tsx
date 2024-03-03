import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { todosApi } from "./features/api/todosApi.tsx";
import Post from "./components/Post.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/post/:postId",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={todosApi}>
      <RouterProvider router={router} />
    </ApiProvider>
  </React.StrictMode>
);
