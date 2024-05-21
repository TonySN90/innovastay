import "@bitnoi.se/react-scheduler/dist/style.css";
import "./styles/index.css";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store.ts";
import { ErrorBoundary } from "react-error-boundary";

import "react-datepicker/dist/react-datepicker.css";
import "./features/bookings/bookingsform.css";
import { Toaster } from "react-hot-toast";
import ErrorFallback from "./ui/ErrorFallback.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <Toaster />
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
