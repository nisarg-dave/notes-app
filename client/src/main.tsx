import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createClient, Provider } from "urql";

const client = createClient({
  url: import.meta.env.VITE_API_URL || "http://localhost:4000/graphql",
  exchanges: [],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider value={client}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
