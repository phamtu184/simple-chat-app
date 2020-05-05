import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./message";
import TypingLoader from "../../loader/typingLoader";

export default function ChatBox({ messages, myname, isTyping }) {
  return (
    <ScrollToBottom className="bg-white flex-grow flex flex-col overflow-y-auto">
      {messages.map((item, index) => (
        <div key={index}>
          <Message message={item} myname={myname} />
        </div>
      ))}
      {isTyping ? <TypingLoader /> : ""}
    </ScrollToBottom>
  );
}
