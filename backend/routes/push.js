const express = require('express');
const router = express.Router();
const webpush = require('web-push');

// TODO: Replace with your VAPID keys
const VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY_HERE';
const VAPID_PRIVATE_KEY = 'YOUR_VAPID_PRIVATE_KEY_HERE';

webpush.setVapidDetails(
  'mailto:your@email.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// In-memory store for demo (replace with DB in production)
const subscriptions = [];

router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscribed' });
});

// Example endpoint to send a notification to all subscribers
router.post('/notify', async (req, res) => {
  const { title, body, url } = req.body;
  const payload = JSON.stringify({ title, body, url });
  const results = await Promise.all(subscriptions.map(sub =>
    webpush.sendNotification(sub, payload).catch(e => e)
  ));
  res.json({ sent: results.length });
});

module.exports = router;
