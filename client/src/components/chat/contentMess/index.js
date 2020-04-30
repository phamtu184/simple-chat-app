import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import TopTitle from "./topTitle";
import InputText from "./inputText";
import axios from "axios";
import url from "../../../config/url";
import ChatBox from "./chatBox";
import { ChatContext } from "../context";
import { useHistory } from "react-router-dom";

let socket = io("/", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});
export default function ContentMess() {
  let { id } = useParams();
  const messageInput = useRef(null);
  const [messages, setMessages] = useState([]);
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
    socket.emit("join", { id1: myId, id2: id });
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
    axios
      .post(`${url.LOCAL}/api/getchat`, { id1: myId, id2: id })
      .then((res) => {
        setMessages(res.data.messages);
      });
  };
  const sendMessage = () => {
    const messValue = messageInput.current.value;
    messageInput.current.value = "";
    socket.emit("sendMessage", {
      content: messValue,
      id1: myId,
      id2: id,
      ofUser: myInfo.username,
    });
    if (messValue) {
      axios
        .post(`${url.LOCAL}/api/sendchat`, {
          id1: myId,
          id2: id,
          messValue,
          username: myInfo.username,
        })
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
    }
  };
  return (
    <div className="w-3/4 h-full ">
      <TopTitle name={friendInfo.username} color={friendInfo.color} />
      <ChatBox messages={messages} myname={myInfo.username} />
      <InputText messageInput={messageInput} sendMessage={sendMessage} />
    </div>
  );
}
