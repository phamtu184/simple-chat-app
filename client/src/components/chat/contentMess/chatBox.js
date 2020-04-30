import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./message";

export default function ChatBox({ messages, myname }) {
  return (
    <ScrollToBottom className='className="overflow-auto"'>
      {messages.map((item, index) => (
        <div key={index}>
          <Message message={item} myname={myname} />
        </div>
      ))}
    </ScrollToBottom>
  );
}
