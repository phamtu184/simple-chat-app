import React from "react";

export default function Message({ message, myname }) {
  const { content, ofUser, color } = message;
  let isSentByCurrentUser = false;
  if (ofUser === myname) {
    isSentByCurrentUser = true;
  }
  return (
    <>
      {isSentByCurrentUser ? (
        <div className="flex justify-end mt-1 px-2">
          <div
            className="text-white rounded-full px-4 py-2 bg-green-600 inline-block"
            style={{ maxWidth: "80%" }}
          >
            <p className="w-full float left wrap break-words text-white">
              {content}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-start items-center mt-1 px-2">
          <div
            className="rounded-full h-8 w-8 relative mr-2"
            style={{ backgroundColor: color }}
          >
            <span
              className="absolute uppercase text-xs"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              {ofUser ? ofUser.slice(0, 3) : "test"}
            </span>
          </div>
          <div
            className="rounded-full px-4 py-2 bg-gray-200 inline-block"
            style={{ maxWidth: "80%" }}
          >
            <p className="w-full float left wrap break-words">{content}</p>
          </div>
        </div>
      )}
    </>
  );
}
