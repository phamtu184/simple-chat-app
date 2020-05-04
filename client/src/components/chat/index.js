import React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import UserList from "./userList";
import ContentMess from "./contentMess";
import { ChatProvider } from "./context";

export default function Chat() {
  let { path } = useRouteMatch();
  return (
    <ChatProvider>
      <div className="flex flex-row border-t shadow-lg border-gray-400 h-screen">
        <UserList />
        <Switch>
          <Route exact path={path}>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path={`${path}/:id`}>
            <ContentMess />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </ChatProvider>
  );
}
