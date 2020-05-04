import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./message";

export default function ChatBox({ messages, myname, isTyping }) {
  return (
    <ScrollToBottom className="bg-white flex-grow flex flex-col overflow-y-auto">
      {messages.map((item, index) => (
        <div key={index}>
          <Message message={item} myname={myname} />
        </div>
      ))}
      {isTyping ? (
        <div className="span w-12 h-6 ml-2 rounded-full bg-gray-200 inline-block flex items-center mt-4">
          <div className="typing_loader ml-2"></div>
        </div>
      ) : (
        ""
      )}
    </ScrollToBottom>
  );
}
