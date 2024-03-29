import "@bitnoi.se/react-scheduler/dist/style.css";
import "./styles/index.css";
import "./styles/timeline.css";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store.ts";

import "react-datepicker/dist/react-datepicker.css";
import "./features/bookings/bookingsform.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
