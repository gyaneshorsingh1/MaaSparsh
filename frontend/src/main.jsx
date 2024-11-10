import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot for React 18+
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Define alert options with modern JS
const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

// Get the root element to attach the React app
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Use createRoot instead of ReactDOM.render

// Render the application wrapped with Redux and AlertProvider
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <App />
    </AlertProvider>
  </Provider>
);
