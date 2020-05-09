const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  id1: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  id2: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  username1: {
    type: String,
    default: "",
  },
  username2: {
    type: String,
    default: "",
  },
  color1: {
    type: String,
    default: "",
  },
  color2: {
    type: String,
    default: "",
  },
  messages: [
    {
      content: String,
      ofUser: String,
      color: String,
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  lastMessage: {
    type: String,
    default: "",
  },
  lastSender: {
    type: String,
    default: "",
  },
});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
