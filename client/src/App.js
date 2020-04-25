import React from "react";
import "./style/style.css";
import "./style/stylecus.css";
import "./style/animate.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducer from "./reducer";

import Chat from "./components/chat";
import Login from "./components/login";
import { ToastContainer } from "react-toastify";

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer autoClose={5000} />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
