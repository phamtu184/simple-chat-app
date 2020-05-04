import React from "react";

export default function TagUser(props) {
  const { name, lastSender, lastMessage, time, color } = props;
  return (
    <>
      <div className="p-2 mr-2">
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
            {name ? name.slice(0, 3) : "test"}
          </span>
        </div>
      </div>
      <div className="truncate md:block hidden">
        <h2>{name || "test"}</h2>
        <div className="flex">
          <p className="text-sm text-gray-600 -mt-1">
            {lastSender ? `${lastSender}: ${lastMessage}` : ""}
          </p>
          <p className="text-sm text-gray-600 ml-4 -mt-1">{time ? time : ""}</p>
        </div>
      </div>
    </>
  );
}
