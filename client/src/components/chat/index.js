import React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import UserList from "./userList";
import ContentMess from "./contentMess";
import { ChatProvider } from "./context";
import ChatSVG from "../../image/chat.svg";

export default function Chat() {
  let { path } = useRouteMatch();
  return (
    <ChatProvider>
      <div className="flex flex-row border-t shadow-lg border-gray-400 h-screen">
        <UserList />
        <Switch>
          <Route exact path={path}>
            <div className="flex flex-col items-center content-center justify-center w-3/4">
              <h3 className="uppercase font-semibold text-3xl text-gray-800 ">
                Simple chat app
              </h3>
              <img src={ChatSVG} alt="ChatSVG" className="w-32 h-32" />
            </div>
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
