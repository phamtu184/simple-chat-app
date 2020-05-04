import React from "react";
import SendSvg from "../../../image/send.svg";

export default function InputText({
  messageInput,
  sendMessage,
  handleKeyPress,
}) {
  return (
    <div className="w-full h-16 bg-white flex p-2">
      <div className="flex-grow flex-shrink flex items-center">
        {/* <img src={SearchIcon} alt="SearchIcon" /> */}
        <input
          className="my-2 p-2 w-full ml-4 rounded-full transition-all 
            duration-500 inline-block text-sm bg-gray-200 border border-transparent 
            focus:bg-white focus:shadow-outline focus:border-gray-300 focus:outline-none truncate"
          placeholder="Nhập tin nhắn..."
          ref={messageInput}
          onKeyPress={handleKeyPress}
        />
        <img
          onClick={sendMessage}
          src={SendSvg}
          className="w-8 h-8 inline-block ml-6 mr-6 cursor-pointer"
          alt="SendSvg"
        />
      </div>
    </div>
  );
}
