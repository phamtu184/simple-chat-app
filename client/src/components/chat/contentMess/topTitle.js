import React from "react";
import TimeFromNow from "../../../config/getTimeOffline";
export default function TopTitle({ friendInfo }) {
  const { username, color, isOnline, onlineFrom } = friendInfo;
  return (
    <div className="flex items-center w-full h-20 shadow">
      <div className="p-2 mr-2 inline-block">
        <div
          className="rounded-full h-12 w-12 relative"
          style={{ backgroundColor: color }}
        >
          <span
            className="absolute uppercase"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {username ? username.slice(0, 3) : ""}
          </span>
          {isOnline ? (
            <span className="bg-green-400 w-3 h-3 rounded-full absolute right-0 bottom-0"></span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="truncate inline-block">
        <h2>{username ? username : ""}</h2>
        <p className="text-sm text-gray-600 -mt-1">
          {isOnline
            ? "Đang hoạt động"
            : `Hoạt động từ ${TimeFromNow(onlineFrom).toString()}`}
        </p>
      </div>
    </div>
  );
}
