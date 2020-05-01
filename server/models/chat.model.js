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
  messages: [
    {
      content: String,
      ofUser: String,
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
