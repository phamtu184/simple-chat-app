import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ChatContext } from "../context";
import TopTitle from "./topTitle";
import InputText from "./inputText";
import axios from "axios";
import url from "../../../config/url";
import ChatBox from "./chatBox";
import { useHistory } from "react-router-dom";
import socket from "../../../config/socket";
import PageLoader from "../../loader/pageLoader";

export default function ContentMess() {
  let { id } = useParams();
  const messageInput = useRef(null);
  const [roomId, setRoomId] = useState([]);
  const [isTyping, setTyping] = useState(false);
  const [friendInfo, setFriendInfo] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { myInfo, setMessages, messages } = useContext(ChatContext);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${url.LOCAL}/api/user`, { id })
      .then((res) => {
        if (res.data) {
          getMessage();
          setFriendInfo(res.data);
        } else {
          history.push("/chat");
        }
      })
      .catch((e) => history.push("/chat"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myInfo, id]);
  useEffect(() => {
    socket.on("typing", ({ typing, currentRoom }) => {
      if (currentRoom === localStorage.currentRoom) {
        if (typing) {
          setTyping(true);
        } else {
          setTyping(false);
        }
      }
    });
  }, []);
  const getMessage = () => {
    axios
      .post(`${url.LOCAL}/api/getchat`, { myId: myInfo.id, frId: id })
      .then((res) => {
        setMessages(res.data.messages);
        socket.emit("join", res.data._id);
        setRoomId(res.data._id);
        localStorage.currentRoom = res.data._id;
        setLoading(false);
      });
  };
  const sendMessage = () => {
    const messValue = messageInput.current.value;
    messageInput.current.value = "";
    if (messValue) {
      axios
        .post(`${url.LOCAL}/api/sendchat`, {
          roomId,
          messValue,
          username: myInfo.username,
        })
        .then((res) => {
          socket.emit("sendMessage", {
            content: messValue,
            roomId,
            newChat: res.data.chat,
            ofUser: myInfo.username,
          });
        })
        .catch((e) => console.log(e));
    }
  };
  const stopTyping = () => {
    socket.emit("typing", { typing: false, roomId });
  };
  var timeout = undefined;
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    } else {
      socket.emit("typing", { typing: true, roomId });
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(stopTyping, 3000);
    }
  };
  return (
    <div className="w-3/4 flex-grow flex-shrink flex flex-col">
      {!isLoading ? (
        <>
          <TopTitle friendInfo={friendInfo} />
          <ChatBox
            messages={messages}
            myname={myInfo.username}
            isTyping={isTyping}
          />
          <InputText
            messageInput={messageInput}
            sendMessage={sendMessage}
            handleKeyPress={handleKeyPress}
          />
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
}
