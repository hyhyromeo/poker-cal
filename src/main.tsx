import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Player from "./pages/Player.tsx";
import Modal from "react-modal";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "player/player:id",
    element: <Player />,
  },
]);
Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
