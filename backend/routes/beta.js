const express = require('express');
const router = express.Router();
const BetaUser = require('../models/BetaUser');
const User = require('../models/User');

// Enable or disable beta mode for a user
router.post('/toggle', async (req, res) => {
  try {
    const { userId, enabled } = req.body;
    if (!userId || typeof enabled !== 'boolean') return res.status(400).json({ error: 'Invalid input' });
    let betaUser = await BetaUser.findOne({ user: userId });
    if (!betaUser) {
      betaUser = new BetaUser({ user: userId, enabled });
    } else {
      betaUser.enabled = enabled;
      betaUser.updatedAt = Date.now();
    }
    await betaUser.save();
    res.json({ success: true, enabled: betaUser.enabled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if user is in beta
router.get('/status/:userId', async (req, res) => {
  try {
    const betaUser = await BetaUser.findOne({ user: req.params.userId });
    res.json({ enabled: !!(betaUser && betaUser.enabled) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get latest beta features (for beta users only)
router.get('/features/:userId', async (req, res) => {
  try {
    const betaUser = await BetaUser.findOne({ user: req.params.userId });
    if (!betaUser || !betaUser.enabled) return res.status(403).json({ error: 'Not a beta user' });
    // Example: fetch beta features from a config or DB
    const features = [
      { name: 'New Chat UI', description: 'Try the new chat interface before everyone else!' },
      { name: 'Voice Notes', description: 'Send and receive voice messages.' }
    ];
    res.json({ features });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
