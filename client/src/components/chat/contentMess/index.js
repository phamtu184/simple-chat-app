import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

let socket;
export default function ContentMess({ myId }) {
  let { id } = useParams();
  useEffect(() => {
    socket = io("/");
    socket.emit("join", { myId, frId: id });
  }, [myId, id]);
  return (
    <div className="w-3/4 h-full overflow-auto">
      <h1>ContentMess {id}</h1>
    </div>
  );
}
