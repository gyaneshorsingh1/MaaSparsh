import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot for React 18+
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";



// Get the root element to attach the React app
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Use createRoot instead of ReactDOM.render

// Render the application wrapped with Redux and AlertProvider
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
