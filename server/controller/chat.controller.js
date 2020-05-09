const Chat = require("../models/chat.model");
const User = require("../models/user.model");
module.exports.getChat = async function (req, res) {
  const { myId, frId } = req.body;
  let temp1 = myId,
    temp2 = frId;
  if (!myId || !frId) return false;
  if (frId > myId) (temp2 = myId), (temp1 = frId);
  const user1 = await User.findById(temp1)
    .select("-password -onlineFrom -isOnline -dateAdded")
    .lean();
  const user2 = await User.findById(temp2)
    .select("-password -onlineFrom -isOnline -dateAdded")
    .lean();
  const chat = await Chat.findOne({ id1: temp1, id2: temp2 }).lean();
  if (!chat) {
    const newChat = Chat({
      id1: temp1,
      id2: temp2,
      username1: user1.username,
      color1: user1.color,
      username2: user2.username,
      color2: user2.color,
    });
    newChat.save((err, cv) => {
      if (err)
        return res.status(500).json({ message: "Server lỗi khi tạo chat mới" });
      return res.status(200).json(cv);
    });
  } else {
    return res.status(200).json(chat);
  }
};
module.exports.getChatList = async function (req, res) {
  const { userid } = req.body;
  if (!userid) return res.status(400).json({ message: "Mất dữ liệu" });
  const chatList = await Chat.find({
    $or: [{ id1: userid }, { id2: userid }],
    $and: [{ lastMessage: { $ne: "" } }],
  })
    .select("-messages")
    .sort({ lastUpdate: -1 })
    .lean();
  if (chatList) return res.status(200).json(chatList);
  return res.status(200).json([]);
};
module.exports.postSendChat = async function (req, res) {
  const { roomId, messValue, username, color } = req.body;
  if (!roomId || !username || !messValue || !color)
    return res.status(400).json({ message: "Mất dữ liệu" });
  const chat = await Chat.findById(roomId);
  if (!chat)
    return res.status(404).json({ message: "Không tìm thấy cuộc trò chuyện" });
  chat.messages.push({
    content: messValue,
    ofUser: username,
    color: color,
    time: Date.now(),
  });
  chat.lastMessage = messValue;
  chat.lastSender = username;
  chat.lastUpdate = Date.now();
  chat.save((err, cv) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Server bị lỗi khi thêm tin nhắn" });
    }
    const newMessage = cv.messages[chat.messages.length - 1];
    chat.messages = undefined;
    return res.status(200).json({
      message: "Thêm đoạn chat thành công",
      newMessage: newMessage,
      chat: chat.toObject(),
    });
  });
};
