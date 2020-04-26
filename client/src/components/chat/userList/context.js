import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import url from "../../../config/url";

export const UserListContext = createContext();

export function UserListProvider(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`${url.LOCAL}/api/users`).then((res) => setUsers(res.data));
  }, []);
  const history = useHistory();
  const logoutHandle = () => {
    localStorage.removeItem("token-auth");
    history.push("/");
  };
  return (
    <UserListContext.Provider
      value={{
        users,
        logoutHandle,
      }}
    >
      {props.children}
    </UserListContext.Provider>
  );
}
