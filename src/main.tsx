import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "@fontsource/fira-sans/300.css";
import "@fontsource/fira-sans/400.css";
import "@fontsource/fira-sans/500.css";
import "@fontsource/fira-sans/700.css";
import "./app/styles/index.css";
import "@mantine/core/styles.css";
import { appStarted } from "./shared/config/init.ts";

// Стартуем приложение и запускаем роутер
appStarted();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
