const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

// Create chat (1:1 or group)
router.post('/', async (req, res) => {
  try {
    const { name, users, isGroup } = req.body;
    const chat = new Chat({ name, users, isGroup });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user chats
router.get('/:userId', async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.params.userId }).populate('users').populate('latestMessage');
    res.json(chats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
