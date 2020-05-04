import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import url from "../../config/url";
import socket from "../../config/socket";

export const ChatContext = createContext();

export function ChatProvider(props) {
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [myInfo, setMyInfo] = useState("");
  const [isSearch, setSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [usersSearch, setUsersSearch] = useState([]);
  const tokenAuth = localStorage.getItem("token-auth");
  const history = useHistory();
  useEffect(() => {
    if (!tokenAuth) {
      history.push("/");
    } else {
      axios
        .post(`${url.LOCAL}/api/isLogin`, { tokenAuth })
        .then((res) => {
          socket.emit("userLogin", res.data.id);
          setMyInfo(res.data);
          axios
            .post(`${url.LOCAL}/api/chatlist`, { userid: res.data.id })
            .then((ress) => {
              setChatList(ress.data);
              socket.on(
                "receiveMessage",
                ({ message, newChat, thisRoomId }) => {
                  if (localStorage.currentRoom === thisRoomId) {
                    setMessages((messages) => [...messages, message]);
                  }
                  const newArr = ress.data.filter((x) => x._id !== thisRoomId);
                  setChatList([newChat, ...newArr]);
                }
              );
            });
        })
        .catch((e) => history.push("/"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeSearch = (e) => {
    setInputSearch(e.target.value);
  };
  const searchUsers = () => {
    if (inputSearch.length > 0) {
      setSearch(true);
      axios
        .post(`${url.LOCAL}/api/users`, { text: inputSearch })
        .then((res) => {
          setUsersSearch(res.data);
        });
    } else {
      setSearch(false);
    }
  };
  const logoutHandle = () => {
    localStorage.removeItem("token-auth");
    socket.emit("userLogout", myInfo.id);
    history.push("/");
  };
  return (
    <ChatContext.Provider
      value={{
        chatList,
        setChatList,
        messages,
        setMessages,
        logoutHandle,
        myInfo,
        isSearch,
        handleChangeSearch,
        inputSearch,
        usersSearch,
        searchUsers,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}
