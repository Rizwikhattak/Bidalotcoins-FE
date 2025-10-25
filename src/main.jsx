import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "./components/ui/sonner.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" closeButton />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
