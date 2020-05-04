import React from "react";
import "./style/style.css";
import "./style/stylecus.css";
import "./style/animate.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Chat from "./components/chat";
import Login from "./components/login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer autoClose={5000} />
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/chat" component={Chat} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
