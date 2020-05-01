import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import url from "../../config/url";
import socket from "../../config/socket";

export const ChatContext = createContext();

export function ChatProvider(props) {
  const [users, setUsers] = useState([]);
  const [myInfo, setMyInfo] = useState("");
  const tokenAuth = localStorage.getItem("token-auth");
  const history = useHistory();
  useEffect(() => {
    axios.get(`${url.LOCAL}/api/users`).then((res) => setUsers(res.data));
    if (!tokenAuth) {
      history.push("/");
    } else {
      axios
        .post(`${url.LOCAL}/api/isLogin`, { tokenAuth })
        .then((res) => {
          socket.emit("userLogin", res.data.id);
          setMyInfo(res.data);
        })
        .catch((e) => history.push("/"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logoutHandle = () => {
    localStorage.removeItem("token-auth");
    socket.emit("userLogout", myInfo.id);
    history.push("/");
  };
  return (
    <ChatContext.Provider
      value={{
        users,
        logoutHandle,
        myInfo,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}
