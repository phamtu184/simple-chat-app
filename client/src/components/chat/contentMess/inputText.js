import React from "react";
import SendSvg from "../../../image/send.svg";

export default function InputText({ messageInput, sendMessage }) {
  return (
    <div className="flex items-center w-full h-20 shadow bottom-0 fixed shadow-lg border-t border-gray-300">
      <div className="w-full">
        {/* <img src={SearchIcon} alt="SearchIcon" /> */}
        <input
          className="my-2 p-2 md:w-8/12 w-7/12 ml-4 rounded-full transition-all 
            duration-500  inline-block text-sm bg-gray-200 border border-transparent 
            focus:bg-white focus:shadow-outline focus:border-gray-300 focus:outline-none"
          placeholder="Nhập tin nhắn..."
          ref={messageInput}
          onKeyPress={(event) => (event.key === "Enter" ? sendMessage() : null)}
        />
        <img
          onClick={sendMessage}
          src={SendSvg}
          className="w-8 h-8 inline-block ml-2 cursor-pointer"
          alt="SendSvg"
        />
      </div>
    </div>
  );
}
