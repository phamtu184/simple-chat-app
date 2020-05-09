import React, { useContext } from "react";
import LogOutSvg from "../../../image/logout.svg";
import { ChatContext } from "../context";

export default function Title() {
  const { logoutHandle, myInfo } = useContext(ChatContext);
  return (
    <div className="h-20 flex items-center p-4 shadow">
      <div className="sm:p-2 sm:mr-2 mr-1">
        <div
          className="rounded-full md:h-12 md:w-12 h-10 w-10 relative"
          style={{ backgroundColor: myInfo.color }}
        >
          <span
            className="absolute uppercase"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {myInfo.username ? myInfo.username.slice(0, 3) : ""}
          </span>
        </div>
      </div>
      <h2 className="text-2xl font-bold md:block hidden">Chat</h2>
      <button
        onClick={logoutHandle}
        className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full h-10 w-10 relative ml-auto transition-colors duration-500 focus:outline-none"
      >
        <img
          src={LogOutSvg}
          alt="LogOutSvg"
          className="w-5 h-5 absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </button>
    </div>
  );
}
