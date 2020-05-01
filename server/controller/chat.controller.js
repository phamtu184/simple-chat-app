const Chat = require("../models/chat.model");
module.exports.getChat = async function (req, res) {
  const { myId, frId } = req.body;
  let temp1 = myId,
    temp2 = frId;
  if (!myId || !frId) return false;
  if (frId > myId) (temp2 = myId), (temp1 = frId);
  const chat = await Chat.findOne({ id1: temp1, id2: temp2 }).lean();
  if (!chat) {
    const newChat = Chat({ id1: temp1, id2: temp2 });
    newChat.save((err, cv) => {
      if (err)
        return res.status(500).json({ message: "Server lỗi khi tạo chat mới" });
      return res.status(200).json(cv);
    });
  } else {
    return res.status(200).json(chat);
  }
};
module.exports.postSendChat = async function (req, res) {
  const { roomId, messValue, username } = req.body;
  if (!roomId || !username || !messValue)
    return res.status(400).json({ message: "Mất dữ liệu" });
  const chat = await Chat.findById(roomId);
  if (!chat)
    return res.status(404).json({ message: "Không tìm thấy cuộc trò chuyện" });
  chat.messages.push({
    content: messValue,
    ofUser: username,
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
