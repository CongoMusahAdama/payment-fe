import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "../src/context/auth.context.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
