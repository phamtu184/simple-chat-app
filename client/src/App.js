import React from "react";
import "./style/style.css";
import "./style/stylecus.css";
import "./style/animate.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./components/chat";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/chat" exact component={Chat} />
    </Router>
  );
}

export default App;
