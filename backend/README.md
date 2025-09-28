# Eye to Eye Backend

Node.js/Express backend for Eye to Eye App.

## Features
- RESTful API for authentication, chat, and messaging
- Real-time messaging with Socket.IO
- MongoDB for data storage
- JWT authentication

## Setup
1. Copy `.env.example` to `.env` and fill in your values.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start server:
   ```sh
   npm run dev
   ```

## Scripts
- `npm run dev` — Start with nodemon
- `npm start` — Start normally
- `npm test` — Run backend tests

## Folder Structure
- `/models` — Mongoose schemas
- `/routes` — API endpoints
- `/controllers` — Logic (expandable)
- `/middleware` — Auth, error handling, etc.
- `/utils` — Helpers

## Version
1.0.0

## License
MIT
