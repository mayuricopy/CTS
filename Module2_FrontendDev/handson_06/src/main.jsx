import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { EnrollmentProvider } from "./context/EnrollmentContext";
import { store } from "./store/store";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <EnrollmentProvider>
          <App />
        </EnrollmentProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);