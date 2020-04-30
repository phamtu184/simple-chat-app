import React, { useContext } from "react";
import LogOutSvg from "../../../image/logout.svg";
import { ChatContext } from "../context";

export default function Title() {
  const { logoutHandle } = useContext(ChatContext);
  return (
    <div className="h-20 flex items-center p-4 shadow">
      <h2 className="text-2xl font-bold">Chat</h2>
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
