import React from "react";

export default function Message({ message, myname }) {
  const { content, ofUser } = message;
  let isSentByCurrentUser = false;
  if (ofUser === myname) {
    isSentByCurrentUser = true;
  }
  return (
    <>
      {isSentByCurrentUser ? (
        <div className="flex justify-end mt-1 px-2">
          <p className="pr-2 flex items-center text-gray-900">{myname}</p>
          <div
            className="text-white rounded-full px-4 py-2 bg-blue-500 inline-block"
            style={{ maxWidth: "80%" }}
          >
            <p className="w-full float left wrap break-words text-white">
              {content}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-start mt-1 px-2">
          <div className="rounded-full px-4 py-2 bg-gray-200 inline-block">
            <p className="w-full float left wrap break-words text-gray-900">
              {content}
            </p>
          </div>
          <p className="flex items-center pl-2 ">{ofUser}</p>
        </div>
      )}
    </>
  );
}
