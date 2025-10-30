const path = require('path');
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());

app.use(express.json());
// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chats', require('./routes/chat'));
app.use('/api/messages', require('./routes/message'));
app.use('/api/users', require('./routes/user'));
app.use('/api/users', require('./routes/userPrivacy'));
app.use('/api/beta', require('./routes/beta'));
app.use('/api/voice', require('./routes/voice'));
app.use('/uploads/voice', express.static(path.join(__dirname, 'uploads/voice')));
app.use('/api/auth-device', require('./routes/authDevice'));
app.use('/api/push', require('./routes/push'));
app.use('/api/onesignal', require('./routes/onesignal'));

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  // ...socket event handlers...
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
