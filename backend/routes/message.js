const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Chat = require('../models/Chat');

// Send message
router.post('/', async (req, res) => {
  try {
    const { sender, content, chatId, media } = req.body;
    const message = new Message({ sender, content, chat: chatId, media });
    await message.save();
    // Update latest message in chat
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get messages for chat
router.get('/:chatId', async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate('sender');
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
