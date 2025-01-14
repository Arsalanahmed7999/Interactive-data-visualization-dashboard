import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ChartProvider from "./networks/ContextApi";
import { AuthProvider } from "./networks/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ChartProvider>
      <App />
    </ChartProvider>
  </AuthProvider>
);
