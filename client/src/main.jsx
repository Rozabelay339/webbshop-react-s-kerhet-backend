import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

const shouldUseLocalhost = import.meta.env.DEV && window.location.hostname === "127.0.0.1";

if (shouldUseLocalhost) {
  window.location.replace(window.location.href.replace("//127.0.0.1", "//localhost"));
} else {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
