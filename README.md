# Eye to Eye App

A fullstack messaging platform inspired by WhatsApp and Telegram.

## Features
- Real-time chat (1:1 and group)
- Media sharing (images, files)
- User authentication & profile
- Group management
- Notifications
- Modern responsive UI

## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB

## Folder Structure
- `/frontend` — React app (UI)
- `/backend` — Node.js/Express API & Socket.IO
- `/database` — MongoDB models & seed scripts

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)

### Setup
1. Clone this repo or copy the folder.
2. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```sh
   cd ../frontend
   npm install
   ```
4. Set up environment variables (see `.env.example` in each folder).
5. Start backend:
   ```sh
   cd ../backend
   npm run dev
   ```
6. Start frontend:
   ```sh
   cd ../frontend
   npm run dev
   ```

## Version
1.0.0

## License
MIT

---

For more details, see the README files in each subfolder.