import { useEffect } from "react";
import Home from "./pages/Home.js";
import Modal from "react-modal";
import React from "react";

const App = () => {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return <Home />;
};

export default App;
