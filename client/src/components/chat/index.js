import React, { useEffect, useState } from "react";
import { useHistory, Switch, Route, useRouteMatch } from "react-router-dom";
import axios from "axios";
import url from "../../config/url";
import UserList from "./userList";
import ContentMess from "./contentMess";

export default function Chat() {
  const history = useHistory();
  let { path } = useRouteMatch();
  const [myId, setMyId] = useState("");
  const tokenAuth = localStorage.getItem("token-auth");
  useEffect(() => {
    if (!tokenAuth) {
      history.push("/");
    } else {
      axios
        .post(`${url.LOCAL}/api/isLogin`, { tokenAuth })
        .then((res) => {
          setMyId(res.data.id);
        })
        .catch((e) => history.push("/"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row border-t shadow-lg border-gray-400 h-screen">
      <UserList />
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:id`}>
          <ContentMess myId={myId} />
        </Route>
      </Switch>
    </div>
  );
}
