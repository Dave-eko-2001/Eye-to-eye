const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Password authentication
router.post('/password', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ success: true, userId: user._id });
});

// WebAuthn/FIDO2 registration and authentication endpoints would go here
// (for real biometric support, use a library like @simplewebauthn/server)

module.exports = router;
