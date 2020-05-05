import React, { useContext } from "react";
import Loader from "../../loader/partLoader";
import { NavLink, useRouteMatch } from "react-router-dom";
import { ChatContext } from "../context";
import Title from "./title";
import InputSearch from "./inputSearch";
import TagUser from "./tagUser";

export default function UserList() {
  const { chatList, usersSearch, isSearch, myInfo, isLoading } = useContext(
    ChatContext
  );
  let { url } = useRouteMatch();
  return (
    <div className="w-1/4 h-full border-r border-gray-300 ">
      <Title />
      <InputSearch />
      <div className="overflow-auto" style={{ height: "80%" }}>
        {isSearch ? (
          <>
            {usersSearch.map((user, index) => (
              <div className="px-4 mb-1" key={index}>
                <NavLink
                  activeClassName="bg-gray-200 "
                  to={`${url}/${user._id}`}
                  className="flex rounded-lg w-full items-center"
                >
                  <TagUser name={user.username} color={user.color} />
                </NavLink>
              </div>
            ))}
          </>
        ) : (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {chatList.map((chat, index) => (
                  <div className="px-4 mb-1" key={index}>
                    <span></span>
                    <NavLink
                      activeClassName="bg-gray-200 "
                      to={`${url}/${
                        myInfo.id === chat.id1 ? chat.id2 : chat.id1
                      }`}
                      className="flex rounded-lg w-full items-center"
                    >
                      <TagUser
                        name={
                          myInfo.username === chat.username1
                            ? chat.username2
                            : chat.username1
                        }
                        color={
                          myInfo.color === chat.color1
                            ? chat.color2
                            : chat.color1
                        }
                        lastSender={chat.lastSender}
                        lastMessage={chat.lastMessage}
                      />
                    </NavLink>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
