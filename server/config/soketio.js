const User = require("../models/user.model");
const users = {};
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("we have a new connect");
    socket.on("join", (roomId) => {
      socket.join(roomId);
    });

    socket.on("userLogin", (uId) => {
      User.findById(uId).exec((err, user) => {
        if (user) {
          console.log("user login", user.username);
          users[socket.id] = uId;
          user.isOnline = true;
          user.save();
        }
      });
    });
    socket.on("userLogout", (uId) => {
      User.findById(uId).exec((err, user) => {
        if (user) {
          console.log("user logout", user.username);
          user.onlineFrom = Date.now();
          user.isOnline = false;
          user.save();
        }
      });
    });
    socket.on("disconnect", () => {
      console.log("user disconnect", users);
      if (users[socket.id]) {
        io.emit("userLogout", users[socket.id]);
        delete users[socket.id];
        User.findById(users[socket.id]).exec((err, user) => {
          if (user) {
            console.log("user logout", user.username);
            user.isOnline = false;
            user.onlineFrom = Date.now();
            user.save();
          }
        });
      }
      socket.disconnect();
    });
    socket.on("sendMessage", ({ content, roomId, ofUser }) => {
      const message = { content, ofUser };
      io.to(roomId).emit("receiveMessage", { message });
    });
  });
};
