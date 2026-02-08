const express = require('express');
const router = express.Router();
const webpush = require('web-push');


// VAPID keys for web push notifications
const VAPID_PUBLIC_KEY = 'BAdPn4s6LzCH3dZhh45SPcDGtvyCe8Ukp48KtvR7iLYVxWTAUY9TO8kGyQANDznJ4oQh3nEHSKhlWjlWSP0nvJc';
const VAPID_PRIVATE_KEY = '7pfGVE_qcv_D1OL7HbpUdfl4TT69Y9Lk7_8yBcfJAWc';

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
