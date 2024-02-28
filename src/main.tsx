import "@bitnoi.se/react-scheduler/dist/style.css";
import "./index.css";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
