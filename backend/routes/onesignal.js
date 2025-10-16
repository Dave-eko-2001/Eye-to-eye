const express = require('express');
const axios = require('axios');
const router = express.Router();

// TODO: Replace with your OneSignal App ID and REST API Key
const ONESIGNAL_APP_ID = 'YOUR_ONESIGNAL_APP_ID_HERE';
const ONESIGNAL_API_KEY = 'YOUR_ONESIGNAL_REST_API_KEY_HERE';

// Register device/player (client should call this with OneSignal player/user ID)
router.post('/register', (req, res) => {
  // Store player/user ID in your DB for the user (not implemented here)
  res.json({ message: 'Player ID received (store in DB for user)' });
});

// Send notification to a user (by player ID)
router.post('/notify', async (req, res) => {
  const { playerId, title, message, url } = req.body;
  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', {
      app_id: ONESIGNAL_APP_ID,
      include_player_ids: [playerId],
      headings: { en: title },
      contents: { en: message },
      url: url || undefined
    }, {
      headers: {
        'Authorization': `Basic ${ONESIGNAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ success: true, result: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
