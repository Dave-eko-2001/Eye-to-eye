const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Update privacy setting
router.post('/privacy', async (req, res) => {
  const { userId, privacy } = req.body;
  if (!['private', 'public'].includes(privacy)) return res.status(400).json({ error: 'Invalid privacy value' });
  try {
    await User.findByIdAndUpdate(userId, { privacy });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search users (respects privacy)
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json([]);
  try {
    // Only return public profiles for non-contacts
    const users = await User.find({
      privacy: 'public',
      $or: [
        { username: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
