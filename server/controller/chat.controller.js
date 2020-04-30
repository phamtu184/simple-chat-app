const Chat = require("../models/chat.model");
module.exports.getChat = async function (req, res) {
  const { id1, id2 } = req.body;
  let temp1 = id1,
    temp2 = id2;
  if (!id1 || !id2) return false;
  if (id2 > id1) (temp2 = id1), (temp1 = id2);
  const chat = await Chat.findOne({ roomId: temp1 + temp2 }).lean();
  if (!chat) {
    const newChat = Chat({ roomId: temp1 + temp2 });
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
  const { id1, id2, messValue, username } = req.body;
  if (!id1 || !id2 || !messValue)
    return res.status(400).json({ message: "Mất dữ liệu" });
  let temp1 = id1,
    temp2 = id2;
  if (id2 > id1) (temp2 = id1), (temp1 = id2);
  const chat = await Chat.findOne({ roomId: temp1 + temp2 });
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
