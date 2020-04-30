module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("we have a new connect");
    socket.on("join", ({ id1, id2 }) => {
      let temp1 = id1,
        temp2 = id2;
      if (id2 > id1) (temp2 = id1), (temp1 = id2);
      socket.join(temp1 + temp2);
    });
    socket.on("disconnect", () => {
      console.log("user disconnect");
    });
    socket.on("sendMessage", ({ content, id1, id2, ofUser }) => {
      let temp1 = id1,
        temp2 = id2;
      if (id2 > id1) (temp2 = id1), (temp1 = id2);
      const message = { content, ofUser };
      io.to(temp1 + temp2).emit("receiveMessage", { message });
    });
  });
};
