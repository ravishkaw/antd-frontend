import { createRoot } from "react-dom/client";
import "./index.css";
import { App as AntdApp } from "antd";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AntdApp>
    <App />
  </AntdApp>
);
