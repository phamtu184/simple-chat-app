require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const apiRouter = require("./routes/api");
// connect mongodb
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error));
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose success connect");
});
// connect socketio
io.on("connection", (socket) => {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", (data) => {
    console.log(data);
  });
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

module.exports = app;
