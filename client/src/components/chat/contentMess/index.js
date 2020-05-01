import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import TopTitle from "./topTitle";
import InputText from "./inputText";
import axios from "axios";
import url from "../../../config/url";
import ChatBox from "./chatBox";
import { ChatContext } from "../context";
import { useHistory } from "react-router-dom";
import socket from "../../../config/socket";

export default function ContentMess() {
  let { id } = useParams();
  const messageInput = useRef(null);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [friendInfo, setFriendInfo] = useState("");
  const { myInfo } = useContext(ChatContext);
  const history = useHistory();
  const myId = myInfo.id;
  useEffect(() => {
    socket.on("receiveMessage", ({ message }) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);
  useEffect(() => {
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
  }, [myId, id]);

  const getMessage = () => {
    axios.post(`${url.LOCAL}/api/getchat`, { myId, frId: id }).then((res) => {
      setMessages(res.data.messages);
      socket.emit("join", res.data._id);
      setRoomId(res.data._id);
    });
  };
  const sendMessage = () => {
    const messValue = messageInput.current.value;
    messageInput.current.value = "";
    if (messValue) {
      socket.emit("sendMessage", {
        content: messValue,
        roomId,
        ofUser: myInfo.username,
      });
      axios
        .post(`${url.LOCAL}/api/sendchat`, {
          roomId,
          messValue,
          username: myInfo.username,
        })
        .then()
        .catch((e) => console.log(e));
    }
  };
  return (
    <div className="w-3/4 flex-grow flex-shrink flex flex-col">
      <TopTitle friendInfo={friendInfo} />
      <ChatBox messages={messages} myname={myInfo.username} />
      <InputText messageInput={messageInput} sendMessage={sendMessage} />
    </div>
  );
}
