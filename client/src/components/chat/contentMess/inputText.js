import React, { useState, useEffect, useRef } from "react";
import SendSvg from "../../../image/send.svg";
import SmileIcon from "../../../image/smile.svg";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function useOutsideAlerter(ref, setEmoji) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

export default function InputText(props) {
  const { messageInput, sendMessage, handleKeyPress } = props;
  const [isEmoji, setEmoji] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setEmoji);
  const addEmoji = (e) => {
    let emoji = e.native;
    messageInput.current.value += emoji;
  };
  return (
    <div className="w-full h-16 bg-white flex p-2">
      <div className="flex-grow flex-shrink flex items-center">
        <div className="relative w-full">
          <img
            ref={wrapperRef}
            src={SmileIcon}
            alt="SmileIcon"
            className="w-6 h-6 inline-block cursor-pointer absolute"
            style={{
              right: "0%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
            onClick={() => setEmoji(!isEmoji)}
          />
          <input
            className="my-2 p-2 w-full ml-4 rounded-full transition-all 
            duration-500 inline-block text-sm bg-gray-200 border border-transparent 
            focus:bg-white focus:shadow-outline focus:border-gray-300 focus:outline-none truncate"
            placeholder="Nhập tin nhắn..."
            ref={messageInput}
            onKeyPress={handleKeyPress}
          />
          {isEmoji ? (
            <div
              className="absolute right-0"
              style={{ bottom: "50px" }}
              ref={wrapperRef}
            >
              <Picker
                set="facebook"
                onSelect={addEmoji}
                showPreview={false}
                useButton={false}
              />
            </div>
          ) : (
            ""
          )}
        </div>
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
