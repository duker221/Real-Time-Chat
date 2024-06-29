import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./slices/index";

const root = ReactDOM.createRoot(document.getElementById("chat"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


