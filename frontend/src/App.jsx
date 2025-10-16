import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';
<<<<<<< HEAD
=======
import SecuritySettingsPage from './pages/SecuritySettingsPage';
>>>>>>> b8fa83a (Biometircs intergration into settings)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/register" element={<RegisterPage />} />
<<<<<<< HEAD
        <Route path="/settings" element={<SettingsPage />} />
=======
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/settings/security" element={<SecuritySettingsPage />} />
>>>>>>> b8fa83a (Biometircs intergration into settings)
      </Routes>
    </Router>
  );
}

export default App;
