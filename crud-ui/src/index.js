import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import reducers from "./reducers";
import getStore from "./store/getStore";

ReactDom.render(
  <Provider store={getStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
