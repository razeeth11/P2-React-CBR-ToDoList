import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import App from "./App.jsx";
import { ThemeProvider } from "../components/theme-provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class">
      <App />
    </ThemeProvider>
  </StrictMode>
);
