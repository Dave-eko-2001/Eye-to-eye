import React, { useState } from 'react';
import './SettingsPage.css';

function SettingsPage() {
  const [betaMode, setBetaMode] = useState(() => {
    return localStorage.getItem('eye2eye_beta_mode') === 'true';
  });

  const handleToggle = () => {
    setBetaMode((prev) => {
      localStorage.setItem('eye2eye_beta_mode', !prev);
      return !prev;
    });
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-section">
        <h3>Early Release</h3>
        <div className="toggle-row">
          <span>Beta Mode</span>
          <label className="switch">
            <input type="checkbox" checked={betaMode} onChange={handleToggle} />
            <span className="slider round"></span>
          </label>
        </div>
        <p className="desc">Activate Beta Mode to receive the latest features and releases deployed by the development team before everyone else.</p>
      </div>
    </div>
  );
}

export default SettingsPage;
