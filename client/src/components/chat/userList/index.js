import React, { useContext } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import Title from "./title";
import InputSearch from "./inputSearch";
import TagUser from "./tagUser";
import { ChatContext } from "../context";

export default function UserList() {
  const { users } = useContext(ChatContext);
  let { url } = useRouteMatch();
  return (
    <div className="w-1/4 h-full border-r border-gray-300 ">
      <Title />
      <div className="overflow-auto">
        <InputSearch />
        {users.map((item, index) => (
          <div className="px-4 mb-1" key={index}>
            <NavLink
              activeClassName="bg-gray-200 "
              to={`${url}/${item._id}`}
              className="flex rounded-lg w-full items-center"
            >
              <TagUser name={item.username} color={item.color} />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
