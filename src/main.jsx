import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";

const rootElement = window.document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
