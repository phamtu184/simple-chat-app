module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("we have a new connect");
    socket.on("join", ({ myId, frId }) => console.log(myId, frId));
    socket.on("my other event", (data) => {
      console.log(data);
    });
  });
};
