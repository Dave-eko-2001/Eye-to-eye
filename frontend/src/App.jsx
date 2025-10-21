import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SecuritySettingsPage from './pages/SecuritySettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/theme" element={<ThemeSettingsPage />} />
        <Route path="/settings/security" element={<SecuritySettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
