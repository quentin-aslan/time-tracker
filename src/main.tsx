import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./routes/Dashboard.tsx";
import "./index.css";
import TasksProvider from "./tasksContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TasksProvider>
      <div className={"max-w-screen h-screen"}>
        <RouterProvider router={router} />
      </div>
    </TasksProvider>
  </React.StrictMode>,
);
